import { useContext } from "react"
import { UserContext } from "../context/UserContext"

export const useUser = () => {
  const context = useContext(UserContext)
  return context
}
