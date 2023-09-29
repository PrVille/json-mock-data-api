import axios from "axios"

const baseUrl = "/api/posts"

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export default { getAll }
