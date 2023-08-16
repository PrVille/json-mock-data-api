import axios from "axios"

const baseUrl = import.meta.env.VITE_BASE_URL

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

export default { getAll }
