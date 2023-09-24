import axios from "axios"
import { ApiUser } from "../typings/interfaces"

const baseUrl = "/api/auth"

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
