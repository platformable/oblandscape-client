"use client"
import React, { useState } from "react"
import { FilterState } from "@/app/types"
import { useQuery } from "@tanstack/react-query"
import { CATEGORY_COLORS } from "@/utils/categories"

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
}

const TYPES = ["All", "Bank", "Fintech", "Aggregator"]
const ROLES = ["API Provider"]

const EXPANDABLE_CATEGORIES = [
  "Payments",
  "Lending",
  "Insurance",
  "Wealth Management",
  "Regtech",
  "Real State",
  "Block Chain",
  "Business Operations",
  "Banking Operations",
  "Market Enable And Provision",
  "Others",
]

const TYPE_ACTIVE: Record<string, string> = {
  All: "bg-[#641FD0] text-white border-[#641FD0]",
  Bank: "bg-[#F08039] text-white border-[#F08039]",
  Fintech: "bg-[#E568D9] text-white border-[#E568D9]",
  Aggregator: "bg-[#008859] text-white border-[#008859]",
}

const TYPE_INACTIVE: Record<string, string> = {
  All: "border-[#641FD0] text-[#641FD0]",
  Bank: "border-[#F08039] text-[#F08039]",
  Fintech: "border-[#E568D9] text-[#E568D9]",
  Aggregator: "border-[#008859] text-[#008859]",
}

export default function FilterSidebar({
  filters,
  onChange,
}: FilterSidebarProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>()

  const set = (partial: Partial<FilterState>) =>
    onChange({ ...filters, ...partial })

  // Handler to clear the search input
  const clearSearch = () => {
    set({ search: "" })
  }

  const topCategories = Object.entries(CATEGORY_COLORS)
    .filter(([, v]) => v.subcategories)
    .map(([k]) => k)

  const getSingleEntity = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/entities/${filters.search}`,
    )

    return response.json()
  }

  /*   const { data: singleEntity } = useQuery({
    queryKey: ["singleEntity", filters.search],
    queryFn: () => getSingleEntity(),
  }) */

  return (
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-5 min-w-[260px] max-w-xs w-full sticky top-8 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
      {/* Search */}
      <div className="flex justify-end text-end ">
        <button
          className=" cursor-pointer text-xs uppercase font-bold"
          onClick={() => set({ search: "", types: [], role: "" })}
        >
          X Clear filters
        </button>
      </div>
      <div className="relative flex gap-2 items-center">
        <input
          type="text"
          placeholder="Search Companies..."
          value={filters.search}
          onChange={(e) => set({ search: e.currentTarget.value })}
          className="w-full border border-[#DFD4FC] rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#DFD4FC] placeholder:text-gray-400 pr-8"
        />
        {filters.search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={clearSearch}
            className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {/*     <button
          //onClick={() => getSingleEntity()}
          className=" bg-[#641FD0] text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-[#4b1399]"
        >
          Search
        </button> */}
      </div>

      {/* Type */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Type</p>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => {
            const isAll = t === "All"
            const isActive = isAll
              ? filters.types.length === 0
              : filters.types.includes(t)
            return (
              <button
                key={t}
                onClick={() => {
                  if (isAll) {
                    set({ types: [] })
                  } else {
                    const next = filters.types.includes(t)
                      ? filters.types.filter((x) => x !== t)
                      : [...filters.types, t]
                    set({ types: next })
                  }
                }}
                className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                  isActive
                    ? (TYPE_ACTIVE[t] ??
                      "bg-gray-600 text-white border-gray-600")
                    : (TYPE_INACTIVE[t] ?? "border-gray-400 text-gray-500")
                }`}
              >
                {t}
              </button>
            )
          })}
        </div>
      </div>

      {/* Role */}
      {/* <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Role</p>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => set({ role: filters.role === r ? "" : r })}
              className={`text-xs font-semibold px-3 py-1 rounded-full border transition-colors ${
                filters.role === r
                  ? "bg-purple-600 text-white border-purple-600"
                  : "border-purple-400 text-purple-600"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div> */}

      {/* Categories and Subcategories */}
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">
          Categories and Subcategories
        </p>

        {/* Top-level row: All + main categories */}
        <div className="mb-3">
          <div className="flex flex-col gap-0 mb-3">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => set({ category: "All", subcategories: [] })}
                className={`text-[10px] font-semibold px-3 py-1 rounded-full border transition-colors ${
                  filters.category === "All"
                    ? "bg-[#641FD0] text-white border-[#641FD0]"
                    : "border-[#641FD0] text-[#641FD0]"
                }`}
              >
                All
              </button>
              {topCategories.map((cat) => (
                <div key={cat}>
                  <button
                    onClick={() => {
                      setExpandedCategory(expandedCategory === cat ? null : cat)
                      //set({ category: cat, subcategory: "" })
                    }}
                    className={`text-[10px] font-semibold px-3 py-1 rounded-full border transition-colors flex items-center gap-1 ${
                      CATEGORY_COLORS[cat]?.active
                    }`}
                  >
                    {cat}
                    <span className="text-[10px]">▼</span>
                  </button>
                  {expandedCategory === cat &&
                    CATEGORY_COLORS[cat]?.subcategories && (
                      <div className="flex flex-wrap gap-2  w-full  my-3">
                        {CATEGORY_COLORS[cat].subcategories!.map((sub) => {
                          console.log(cat)
                          return (
                            <button
                              key={sub}
                              onClick={() => {
                                const next = filters.subcategories.includes(sub)
                                  ? filters.subcategories.filter(
                                      (s) => s !== sub,
                                    )
                                  : [...filters.subcategories, sub]
                                set({
                                  subcategories: next,
                                  types: next.length > 0 ? ["Fintech"] : [],
                                })
                              }}
                              className={`text-[10.5px] font-medium px-3 py-1 rounded-full border transition-colors ${
                                filters.subcategories.includes(sub)
                                  ? `${CATEGORY_COLORS[cat]?.subcategory_active_bg ?? "bg-gray-600 text-white border-gray-600"}`
                                  : `${CATEGORY_COLORS[cat]?.subcategory_inactive_bg ?? "border-gray-300 text-gray-600 hover:border-sky-400"}`
                              }`}
                            >
                              {sub}
                            </button>
                          )
                        })}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expandable parent categories */}
        <div className="flex flex-wrap gap-2">
          {/* {EXPANDABLE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => set({ category: cat, subcategory: "" })}
              className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors flex items-center gap-1 ${
                filters.category === cat
                  ? (CATEGORY_COLORS[cat]?.active ??
                    "bg-gray-600 text-white border-gray-600")
                  : (CATEGORY_COLORS[cat]?.inactive ??
                    "border-gray-300 text-gray-600 hover:border-gray-400")
              }`}
            >
              {cat}
              <span className="text-[10px]">▶</span>
            </button>
          ))} */}
        </div>
      </div>
    </aside>
  )
}
