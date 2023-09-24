import axios from "axios"
import { ApiUser, Resource } from "../typings/interfaces"

const baseUrl = "/api/account"

const deleteById = async (id: string, token: string) => {
  const { data } = await axios.delete<ApiUser>(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

const getResources = async (id: string, token: string) => {
  const {
    data: { resources },
  } = await axios.get<{ resources: Resource[] }>(`${baseUrl}/${id}/resources`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return resources
}

const deleteResources = async (id: string, token: string) => {
  const { data } = await axios.delete(`${baseUrl}/${id}/resources`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}

export default { deleteById, getResources, deleteResources }
