import { SortOrder, SortUsersBy } from "./enums"

export interface GetAllBaseQuery {
  skip?: number
  take?: number
  sortOrder?: SortOrder
}

export interface GetAllUsersQuery extends GetAllBaseQuery {
  sortBy?: SortUsersBy
}