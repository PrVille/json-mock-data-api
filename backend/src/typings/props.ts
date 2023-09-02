import { SortOrder, SortPostsBy, SortUsersBy } from "./enums"

export type GetAllUsersProps = {
  skip: number
  take: number
  sortBy: SortUsersBy
  sortOrder: SortOrder
}

export type GetAllPostsProps = {
  skip: number
  take: number
  sortBy: SortPostsBy
  sortOrder: SortOrder
}