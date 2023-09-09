import { ApiUser } from "./authService"

const USER_KEY = "user"

const saveUser = (user: ApiUser): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

const loadUser = (): ApiUser | null => {
  const userJson = window.localStorage.getItem(USER_KEY)
  if (!userJson) return null
  const user: ApiUser = JSON.parse(userJson)
  return user
}

const removeUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

export default {
  saveUser,
  loadUser,
  removeUser,
}
