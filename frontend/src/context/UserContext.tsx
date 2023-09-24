import React, { createContext, ReactNode } from "react"
import { ApiUser } from "../typings/interfaces"

export interface UserContextType {
  user: ApiUser | null
  setUser: (user: ApiUser | null) => void
  clearUser: () => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = React.useState<ApiUser | null>(null)

  const clearUser = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}
