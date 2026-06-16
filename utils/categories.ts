export const CATEGORY_COLORS: Record<
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
  "Financial Management (Business or Personal)": {
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
  "Blockchain/Crypto": {
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
    active: "bg-[#B79609] text-white border-[#B79609]",
    inactive: "border-[#B79609] text-[#B79609] hover:border-[#B79609]",
    subcategory_active_bg: "bg-[#F4EED6] border-[#B79609] text-[#B79609]",
    subcategory_active_text: "text-white",
    subcategory_active_border: "border-[#B79609]",
    subcategory_inactive_bg:
      "bg-white border-[#B79609] text-[#B79609] hover:bg-[#B79609] hover:text-white",
    subcategory_inactive_text: "text-gray-600",
    subcategory_inactive_border: "border-gray-300",
    subcategories: ["Digital and Open Banking enablement"],
  },
  "Market Enablement and Provision": {
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
