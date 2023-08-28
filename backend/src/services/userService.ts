import prisma from "../client"
import { CreateUserBody, UpdateUserBody } from "../typings/bodies"
import { GetAllUsersProps } from "../typings/props"

const getAllUsers = async (usersMeta: GetAllUsersProps) => {
  const { skip, take, sortBy, sortOrder } = usersMeta

  const users = await prisma.user.findMany({
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.user.count()

  return { data: users, total, skip, take }
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  return user
}

const createUser = async (userToCreate: CreateUserBody) => {
  const user = await prisma.user.create({
    data: {
      ...userToCreate,
    },
  })

  return user
}

const updateUserById = async (id: string, userToUpdate: UpdateUserBody) => {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...userToUpdate,
    },
  })

  return user
}

const deleteUserById = async (id: string) => {
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })

  return user
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
}
