import { SortOrder, SortUsersBy } from "./enums"

export type GetAllUsersProps = {
  skip: number
  take: number
  sortBy: SortUsersBy
  sortOrder: SortOrder
}