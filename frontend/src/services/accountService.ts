import axios from "axios"

const baseUrl = "/api/account"

const deleteById = async (id: string, token: string) => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

export default { deleteById }
