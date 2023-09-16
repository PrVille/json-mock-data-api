import { Transition } from "@headlessui/react"
import { Fragment } from "react"
import { useNotification } from "../hooks/useNotification"
import { NotificationType } from "../typings/enums"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { classNames } from "../utils"

const Notification = () => {
  const { notification, clearNotification } = useNotification()

  if (!notification) return null

  return (
    <Transition
      appear
      show={notification !== null}
      as={Fragment}
      enter="transform transition ease-in-out duration-300"
      enterFrom="translate-y-full opacity-0"
      enterTo="-translate-y-1/2 opacity-100"
    >
      <div className="fixed bottom-0 left-4 z-50">
        <div
          className={classNames(
            "rounded-md shadow-md break-all max-w-md",
            notification.type === NotificationType.error
              ? "bg-red-600"
              : notification.type === NotificationType.success
              ? "bg-green-600"
              : "bg-blue-600"
          )}
        >
          <div className="flex px-3 py-2 gap-4 items-start">
            <h3 className="text-white text-sm font-medium">
              {notification.message}
            </h3>

            <button onClick={clearNotification}>
              <XMarkIcon className="mt-0.5 h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}

export default Notification
