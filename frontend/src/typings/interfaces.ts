import { NotificationType } from "./enums"

export interface Notification {
    message: string
    type: NotificationType
}