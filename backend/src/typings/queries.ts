import { SortOrder, SortPostsBy, SortUsersBy } from "./enums"

export interface GetAllBaseQuery {
  skip?: number
  take?: number
  sortOrder?: SortOrder
}

export interface GetAllUsersQuery extends GetAllBaseQuery {
  sortBy?: SortUsersBy
}

export interface GetAllPostsQuery extends GetAllBaseQuery {
  sortBy?: SortPostsBy
}