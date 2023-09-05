import axios from "axios"

const baseUrl = "/api/posts"

const create = async (objectToCreate: object) => {
  const { data } = await axios.post(baseUrl, objectToCreate)
  return data
}

export default { create }
