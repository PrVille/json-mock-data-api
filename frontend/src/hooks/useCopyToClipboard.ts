import { NotificationType } from "../typings/enums"
import { useNotification } from "./useNotification"

export const useCopyToClipboard = () => {
  const { notify } = useNotification()

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      notify("Copied to clipboard.")
    } catch (error) {
      notify("Failed to copy to clipboard.", NotificationType.error)
    }
  }

  return { copyToClipboard }
}
