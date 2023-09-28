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

const resetResources = async (id: string, token: string) => {
  const { data } = await axios.post(
    `${baseUrl}/${id}/resources`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return data
}

const updateEmailById = async (id: string, token: string, email: string) => {
  const { data } = await axios.post<ApiUser>(
    `${baseUrl}/${id}/update/email`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return data
}

const updatePasswordById = async (
  id: string,
  token: string,
  oldPassword: string,
  newPassword: string
) => {
  const { data } = await axios.post<ApiUser>(
    `${baseUrl}/${id}/update/password`,
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return data
}

export default {
  deleteById,
  getResources,
  deleteResources,
  resetResources,
  updateEmailById,
  updatePasswordById
}
