export interface Company {
  id: number
  name: string
  logo?: string
  type: "Bank" | "Fintech" | "Aggregator"
  roles: string[]
  categories: string[]
  subcategories: string[]
}

export interface FilterState {
  search: string
  types: string[]
  role: string
  category: string
  subcategories: string[]
}

export interface EntityTypes {
  EntityName: string
  EntityDescription: string
  EntityType: string
  Category: string
  EntityURL: string
  CountriesOperatingList: string
  ISOCountryCode: string
  EntityCategoryTaxonomy: string
  Subcategory: string
  logo: string
}
