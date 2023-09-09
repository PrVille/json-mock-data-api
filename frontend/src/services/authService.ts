import axios from "axios"

const baseUrl = "/api/auth"

const signIn = async (email: string, password: string) => {
  const { data } = await axios.post(baseUrl + "/signin", { email, password })
  return data
}

const signUp = async (email: string, password: string) => {
  const { data } = await axios.post(baseUrl + "/signup", { email, password })
  return data
}

export default { signIn, signUp }
