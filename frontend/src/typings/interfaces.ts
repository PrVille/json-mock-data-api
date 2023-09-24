import { NotificationType } from "./enums"

export interface Notification {
  message: string
  type: NotificationType
}

export interface ApiUser {
  id: string
  email: string
  token: string
  createdAt: string
}

export interface Resource {
  name: string
  count: number
}
