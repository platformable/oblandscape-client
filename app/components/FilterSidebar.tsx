"use client"
import React, { useState } from "react"
import { FilterState } from "@/app/types"
import { useQuery } from "@tanstack/react-query"

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

const CATEGORY_COLORS: Record<
  string,
  {
    active: string
    inactive: string
    subcategory_active_bg?: string
    subcategory_active_text?: string
    subcategory_active_border?: string
    subcategory_inactive_bg?: string
    subcategory_inactive_text?: string
    subcategory_inactive_border?: string
    subcategories?: string[]
  }
> = {
  "Financial Management (Business Or Personal)": {
    active: "bg-[#0085BB] text-white border-[#0085BB]",
    inactive: "bg-[#0085BB] text-white border-[#0085BB]",
    subcategory_active_bg: "bg-[#CDEEF8] border-[#0085BB] text-[#0085BB]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#0085BB]",
    subcategory_inactive_bg:
      "bg-white border-[#0085BB] text-[#0085BB] hover:bg-[#0085BB] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Account-keeping and budgeting",
      "Subscription services management",
      "Cashflow and balance transfer management",
      "Tax management",
      "Legal aid and welfare support services",
      "Pensions management",
    ],
  },
  Payments: {
    active: "bg-[#7668FB] text-white border-[#7668FB]",
    inactive: "border-[#7668FB] text-[#7668FB] hover:border-[#7668FB]",
    subcategory_active_bg: "bg-[#E9E6FF] border-[#7668FB] text-[#7668FB]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#7668FB]",
    subcategory_inactive_bg:
      "bg-white border-[#7668FB] text-[#7668FB] hover:bg-[#7668FB] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Card and Wallet Management",
      "Money transfer/Remittances",
      "P2P payments",
      "P2B payments",
      "B2B payments",
      "Payment back-end and infrastructure",
      "FX services",
    ],
  },
  Lending: {
    active: "bg-[#00BB90] text-white border-[#00BB90]",
    inactive: "border-[#00BB90] text-[#00BB90] hover:border-[#00BB90]",
    subcategory_active_bg: "bg-[#CFFAF0] border-[#00BB90] text-[#00BB90]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#00BB90]",
    subcategory_inactive_bg:
      "bg-white border-[#00BB90] text-[#00BB90] hover:bg-[#00BB90] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Alternative lending",
      "Vehicle and equipment leasing",
      "Consumer loans and credit services",
      "Buy Now Pay Later",
      "Credit comparison and application services",
      "Credit scoring",
      "Loan modeling",
      "Invoice factoring",
      "Working capital",
    ],
  },
  Insurance: {
    active: "bg-[#6ECD00] text-white border-[#6ECD00]",
    inactive: "border-[#6ECD00] text-[#6ECD00] hover:border-[#6ECD00]",
    subcategory_active_bg: "bg-[#EBFCD7] border-[#6ECD00] text-[#6ECD00]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#6ECD00]",
    subcategory_inactive_bg:
      "bg-white border-[#6ECD00] text-[#6ECD00] hover:bg-[#6ECD00] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Commercial Insurance",
      "Personal Insurance",
      "P2P Insurance",
    ],
  },
  "Wealth Management": {
    active: "bg-[#C36891] text-white border-[#C36891]",
    inactive: "border-[#C36891] text-[#C36891] hover:border-[#C36891]",
    subcategory_active_bg: "bg-[#F8D9E7] border-[#C36891] text-[#C36891]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#C36891]",
    subcategory_inactive_bg:
      "bg-white border-[#C36891] text-[#C36891] hover:bg-[#C36891] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Institutional Investment Management",
      "Private Investment Management",
      "Capital markets (Trading)",
    ],
  },
  Regtech: {
    active: "bg-[#00B6E3] text-white border-[#00B6E3]",
    inactive: "border-[#00B6E3] text-[#00B6E3] hover:border-[#00B6E3]",
    subcategory_active_bg: "bg-[#D6F7FF] border-[#00B6E3] text-[#00B6E3]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#00B6E3]",
    subcategory_inactive_bg:
      "bg-white border-[#00B6E3] text-[#00B6E3] hover:bg-[#00B6E3] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Credit scoring",
      "Fraud prevention",
      "Legal and regulatory compliance",
    ],
  },
  "Real State": {
    active: "bg-[#C469FD] text-white border-[#C469FD]",
    inactive: "border-[#C469FD] text-[#C469FD] hover:border-[#C469FD]",
    subcategory_active_bg: "bg-[#F4E2FF] border-[#C469FD] text-[#C469FD]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#C469FD]",
    subcategory_inactive_bg:
      "bg-white border-[#C469FD] text-[#C469FD] hover:bg-[#C469FD] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Real Estate Financing/Investing",
      "Real Estate Ownership",
      "Property Leasing",
      "Property development and management",
    ],
  },
  "Block Chain": {
    active: "bg-[#E7877C] text-white border-[#E7877C]",
    inactive: "border-[#E7877C] text-[#E7877C] hover:border-[#E7877C]",
    subcategory_active_bg: "bg-[#FFE2DE] border-[#E7877C] text-[#E7877C]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#E7877C]",
    subcategory_inactive_bg:
      "bg-white border-[#E7877C] text-[#E7877C] hover:bg-[#E7877C] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Crypto Exchange trading",
      "Crypto Payments",
      "Blockchain Solutions",
    ],
  },
  "Business Operations": {
    active: "bg-[#FF9031] text-white border-[#FF9031]",
    inactive: "border-[#FF9031] text-[#FF9031] hover:border-[#FF9031]",
    subcategory_active_bg: "bg-[#FFE8D5] border-[#FF9031] text-[#FF9031]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#FF9031]",
    subcategory_inactive_bg:
      "bg-white border-[#FF9031] text-[#FF9031] hover:bg-[#FF9031] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: [
      "Marketing and sales",
      "Product Development and API Lifecycle Management",
      "API Consulting and digital transformation services",
      "Data, analytics and algorithms",
      "Service and Operational Support",
    ],
  },
  "Banking Operations": {
    active: "bg-[#FF9031] text-white border-[#FF9031]",
    inactive: "border-[#FF9031] text-[#FF9031] hover:border-[#FF9031]",
    subcategory_active_bg: "bg-[#FFE8D5] border-[#FF9031] text-[#FF9031]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#FF9031]",
    subcategory_inactive_bg:
      "bg-white border-[#FF9031] text-[#FF9031] hover:bg-[#FF9031] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: ["Digital and Open Banking enablement"],
  },
  "Market Enable And Provision": {
    active: "bg-[#7F61C2] text-white border-[#7F61C2]",
    inactive: "border-[#7F61C2] text-[#7F61C2] hover:border-[#7F61C2]",
    subcategory_active_bg: "bg-[#F4EFFF] border-[#7F61C2] text-[#7F61C2]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#7F61C2]",
    subcategory_inactive_bg:
      "bg-white border-[#7F61C2] text-[#7F61C2] hover:bg-[#7F61C2] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: ["Account/API Aggregation services", "Marketplaces"],
  },
  Others: {
    active: "bg-[#576895] text-white border-[#576895]",
    inactive: "border-[#576895] text-[#576895] hover:border-[#576895]",
    subcategory_active_bg: "bg-[#DFE6F7] border-[#576895] text-[#576895]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#576895]",
    subcategory_inactive_bg:
      "bg-white border-[#576895] text-[#576895] hover:bg-[#576895] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: ["Others"],
  },
}

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
    <aside className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-5 min-w-[260px] max-w-xs w-full">
      {/* Search */}
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
