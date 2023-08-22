import axios from "axios"

const baseUrl = "/api/users"

const getAll = async () => {
  const { data } = await axios.get(baseUrl, { params: { include: "posts" } })
  return data
}

export default { getAll }
