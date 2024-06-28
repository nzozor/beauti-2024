export interface TreatmentSection {
  data: SectionData[]
  meta: Meta
}

export interface SectionData {
  id: number
  attributes: Attributes
}

export interface Attributes {
  sectionName: string
  layout?: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  Url?: string
  rank: number
  section: SectionData
}

// export interface Section {
//   data?: Data
// }

export interface Data {
  id: number
  attributes: Attributes2
}

export interface Attributes2 {
  sectionName: string
  layout: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  Url: any
  rank: number
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}
