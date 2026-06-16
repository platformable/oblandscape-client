import React from "react"
import { Company, EntityTypes } from "@/app/types"
import { CATEGORY_COLORS } from "@/utils/categories"

interface CompanyCardProps {
  company: EntityTypes
}

const TYPE_COLORS: Record<string, string> = {
  Fintech: "bg-[#E568D9] text-white",
  Bank: "bg-[#F08039] text-white",
  Aggregator: "bg-[#008859] text-white",
}

const ROLE_COLORS: Record<string, string> = {
  "API Provider": "bg-teal-700 text-white",
  Aggregator: "bg-teal-700 text-white",
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const primaryCategory = company?.Category || ""
  const otherSubcategories = company?.Subcategory || ""

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {company.logo ? (
            <img
              src={company.logo}
              alt={company.EntityName}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center text-white font-bold text-lg">
              {company?.EntityName?.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-semibold text-gray-800 text-base">
            {company?.EntityName}
          </span>
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${TYPE_COLORS[company?.EntityType] ?? "bg-gray-200 text-gray-600"}`}
        >
          {company?.EntityType}
        </span>
      </div>

      {/* Category & subcategory tags */}
      <div className="flex flex-wrap gap-2">
        {primaryCategory && company.EntityType !== "Bank" && (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${CATEGORY_COLORS[primaryCategory]?.active ?? "bg-gray-200"} `}
          >
            {primaryCategory}
          </span>
        )}
        {/* {otherSubcategories?.map((sub) => (
          <span
            key={sub}
            className="text-xs font-medium px-3 py-1 rounded-full border border-sky-200 text-sky-700 bg-sky-50"
          >
            {sub}
          </span>
        ))} */}
      </div>
      <div>
        {otherSubcategories && company.EntityType !== "Bank" && (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${CATEGORY_COLORS[primaryCategory]?.subcategory_active_bg ?? "bg-gray-200"} `}
          >
            {otherSubcategories}
          </span>
        )}
      </div>

      {/* Roles */}
      <div className="flex flex-wrap gap-2">
        {/* {company?.roles?.map((role) => (
          <span
            key={role}
            className={`text-xs font-semibold px-3 py-1 rounded-full ${ROLE_COLORS[role] ?? "bg-gray-200 text-gray-600"}`}
          >
            {role}
          </span>
        ))} */}
      </div>
    </div>
  )
}
