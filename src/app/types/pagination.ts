export interface PaginationResponseInterface<T = unknown> {
  count: number
  page: number
  perPage: number
  records: T[]
}
