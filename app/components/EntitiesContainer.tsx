"use client"
import React, { useState, useRef, useEffect } from "react"
import FilterSidebar from "@/app/components/FilterSidebar"
import CompanyCard from "@/app/components/CompanyCard"
import { FilterState } from "../types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"

export default function EntitiesContainer() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    types: [],
    role: "",
    category: "All",
    subcategories: [],
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["entities", filters], // Se recarga cuando cambian los filtros
      queryFn: async ({ pageParam = 1 }) => {
        const queryParams = new URLSearchParams({
          page: String(pageParam),
          limit: "100",
          ...(filters.search && { search: filters.search }),
          ...(filters.types.length > 0 && { type: filters.types.join(",") }),
          ...(filters.subcategories.length > 0 && {
            subcategory: filters.subcategories.join(","),
          }),
          // ... agrega el resto de filtros aquí
        })
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/entities?${queryParams}`,
        )
        return response.json()
      },
      getNextPageParam: (lastPage) =>
        lastPage.pagination.hasNextPage
          ? lastPage.pagination.page + 1
          : undefined,
      initialPageParam: 1,
    })

  console.log("queryParams", filters)

  const allRows = data ? data.pages.flatMap((page) => page.data) : []

  // 2. Lógica para Grid de 2 columnas
  // Dividimos los datos en grupos de 2 para la virtualización
  const itemsPerRow = 2
  const rowCount = Math.ceil(allRows.length / itemsPerRow)

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rowCount + 1 : rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 220, // Altura estimada de tu CompanyCard + gap
    overscan: 5,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  // 3. Trigger de scroll infinito
  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1]
    if (!lastItem) return

    if (lastItem.index >= rowCount - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage, rowCount, isFetchingNextPage, virtualItems])

  return (
    <main className=" py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 ">
        <FilterSidebar filters={filters} onChange={setFilters} />

        {/* CONTENEDOR PRINCIPAL CON SCROLL */}
        <section
          ref={parentRef}
          className="flex-1 overflow-auto bg-white rounded-lg shadow-inner p-4"
          id="scrollable-container"
        >
          {/* DIV RELATIVO CON ALTURA TOTAL */}
          <div
            style={{
              // height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
              backgroundColor: "#ffffff",
            }}
          >
            {virtualItems?.map((virtualRow) => {
              const isLoaderRow = virtualRow.index > rowCount - 1
              // Calculamos qué items van en esta fila
              const startIndex = virtualRow.index * itemsPerRow
              const rowItems = allRows.slice(
                startIndex,
                startIndex + itemsPerRow,
              )

              return (
                <div
                  key={virtualRow.key}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                    //transform: `translateY(120px)`,
                    paddingBottom: "16px", // Espaciado entre filas
                  }}
                >
                  {isLoaderRow ? (
                    <p className="col-span-2 text-center">Loading more...</p>
                  ) : (
                    rowItems?.map((company) => (
                      <CompanyCard key={Math.random()} company={company} />
                    ))
                  )}
                </div>
              )
            })}
          </div>

          {allRows.length === 0 && !isFetchingNextPage && (
            <p className="text-gray-400 text-center py-10">
              No companies found.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
