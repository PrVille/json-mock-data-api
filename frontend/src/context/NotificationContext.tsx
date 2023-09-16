import { createContext, useState, ReactNode } from "react"
import { NotificationType } from "../typings/enums"
import { Notification } from "../typings/interfaces"

export interface NotificationContextType {
  notification: Notification | null
  notify: (message: string, type?: NotificationType, duration?: number) => void
  clearNotification: () => void
}

export const NotificationContext = createContext<NotificationContextType>(
  {} as NotificationContextType
)

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [notificationTimeout, setNotificationTimeout] = useState<number | null>(
    null
  )

  const clearNotification = () => {
    setNotification(null)
  }

  const notify = (
    message: string,
    type = NotificationType.success,
    duration = 5000
  ) => {
    const newNotification = {
      message,
      type,
    }

    if (notificationTimeout) {
      clearTimeout(notificationTimeout)
    }

    setNotification(newNotification)

    const timeoutId = setTimeout(() => {
      clearNotification()
    }, duration)

    setNotificationTimeout(timeoutId)
  }

  return (
    <NotificationContext.Provider
      value={{ notification, notify, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
