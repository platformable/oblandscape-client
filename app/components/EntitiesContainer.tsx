"use client"
import React, { useState, useRef, useEffect } from "react"
import FilterSidebar from "@/app/components/FilterSidebar"
import CompanyCard from "@/app/components/CompanyCard"
import { FilterState } from "../types"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useVirtualizer } from "@tanstack/react-virtual"

import Loader from "@/app/components/Loader"

export default function EntitiesContainer() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    types: [],
    role: "",
    category: "All",
    subcategories: [],
    country: "",
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["entities", filters],
      queryFn: async ({ pageParam = 1 }) => {
        const queryParams = new URLSearchParams({
          page: String(pageParam),
          limit: "100",
          ...(filters.search && { search: filters.search }),
          ...(filters.types.length > 0 && { type: filters.types.join(",") }),
          ...(filters.subcategories.length > 0 && {
            subcategory: filters.subcategories.join(","),
          }),
          ...(filters.country && { country: filters.country }),
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

  const allRows = data ? data.pages.flatMap((page) => page.data) : []

  const filteredRows =
    filters.subcategories.length > 0
      ? allRows.filter((company) =>
          filters.subcategories.includes(company.Subcategory),
        )
      : allRows

  const itemsPerRow = 2
  const rowCount = Math.ceil(filteredRows.length / itemsPerRow)

  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? rowCount + 1 : rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 170,
    overscan: 5,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()

  useEffect(
    function infiniteScrollTrigger() {
      const lastItem = virtualItems[virtualItems.length - 1]
      if (!lastItem) return

      if (
        lastItem.index >= rowCount - 1 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    },
    [hasNextPage, fetchNextPage, rowCount, isFetchingNextPage, virtualItems],
  )

  return (
    <main className=" py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-6 ">
        <FilterSidebar filters={filters} onChange={setFilters} />

        <section
          ref={parentRef}
          className="flex-1 overflow-auto  rounded-lg pr-5"
          id="scrollable-container"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
              //backgroundColor: "#ffffff",
            }}
          >
            {virtualItems?.map((virtualRow) => {
              const isLoaderRow = virtualRow.index > rowCount - 1

              const startIndex = virtualRow.index * itemsPerRow
              const rowItems = filteredRows
                .filter((item) => item.Category !== null)
                .slice(startIndex, startIndex + itemsPerRow)

              return (
                <div
                  key={virtualRow.key}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    //transform: `translateY(120px)`,
                    paddingBottom: "16px",
                  }}
                >
                  {isLoaderRow ? (
                    <Loader size={60} color="#5A24EC" className="mx-auto" />
                  ) : (
                    rowItems?.map((company) => {
                      if (!company.Category) return null
                      return (
                        <CompanyCard key={Math.random()} company={company} />
                      )
                    })
                  )}
                </div>
              )
            })}
          </div>
          {isLoading && (
            <div className="flex justify-center items-center py-10">
              <Loader size={60} color="#5A24EC" />
            </div>
          )}

          {filteredRows.length === 0 && !isFetchingNextPage && !isLoading && (
            <p className="text-gray-400 text-center py-10">
              No companies found.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
