export interface ConsultationDTO {
  data: Data
  meta: Meta
}

export interface Data {
  id: number
  attributes: ConsultationAttributes
}

export interface ConsultationAttributes {
  cke: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  metaTitle: string
  metaDescription: string
}

export interface Meta {}
