import axios from "axios"

const baseUrl = "/api/auth"

export interface ApiUser {
  id: string
  email: string
  token: string
  createdAt: string
}

const signIn = async (email: string, password: string) => {
  const { data } = await axios.post<ApiUser>(baseUrl + "/signin", {
    email,
    password,
  })
  return data
}

const signUp = async (email: string, password: string) => {
  const { data } = await axios.post<ApiUser>(baseUrl + "/signup", {
    email,
    password,
  })
  return data
}

export default { signIn, signUp }
