import prisma from "../client"
import { CreateUserBody, UpdateUserBody } from "../typings/bodies"
import { GetAllPostsProps, GetAllUsersProps } from "../typings/props"
import { DEFAULT_API_USER_ID } from "../utils/config"
import { faker } from "@faker-js/faker"

const getAllUsers = async (usersMeta: GetAllUsersProps, apiUserId: string) => {
  const { skip, take, sortBy, sortOrder } = usersMeta

  const users = await prisma.user.findMany({
    where: {
      apiUserId,
    },
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.user.count({
    where: {
      apiUserId,
    },
  })

  return {
    data: users,
    total,
    skip,
    take,
  }
}

const getUserById = async (id: string, apiUserId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
      apiUserId,
    },
  })

  return user
}

const getAllUserPosts = async (
  userId: string,
  postsMeta: GetAllPostsProps,
  apiUserId: string
) => {
  const { skip, take, sortBy, sortOrder } = postsMeta

  const posts = await prisma.post.findMany({
    where: {
      userId,
      apiUserId,
    },
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.post.count({
    where: {
      userId,
      apiUserId,
    },
  })

  return {
    data: posts,
    total,
    skip,
    take,
  }
}

const createUser = async (userToCreate: CreateUserBody, apiUserId: string) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    const mockUser = {
      id: faker.string.uuid(),
      username: userToCreate.username,
      email: userToCreate.email,
      firstName: userToCreate.firstName,
      lastName: userToCreate.lastName,
      age: userToCreate.age || null,
      imageUrl: userToCreate.imageUrl || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return mockUser
  }

  const user = await prisma.user.create({
    data: {
      ...userToCreate,
      apiUserId,
    },
  })

  return user
}

const updateUserById = async (
  id: string,
  userToUpdate: UpdateUserBody,
  apiUserId: string
) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    const existingUser = await prisma.user.findUniqueOrThrow({
      where: {
        id,
        apiUserId,
      },
    })

    const mockUser = {
      id: existingUser.id,
      username: userToUpdate.username || existingUser.username,
      email: userToUpdate.email || existingUser.email,
      firstName: userToUpdate.firstName || existingUser.firstName,
      lastName: userToUpdate.lastName || existingUser.lastName,
      age: userToUpdate.age || existingUser.age,
      imageUrl: userToUpdate.imageUrl || existingUser.imageUrl,
      createdAt: existingUser.createdAt,
      updatedAt: new Date(),
    }

    return mockUser
  }

  const user = await prisma.user.update({
    where: {
      id,
      apiUserId,
    },
    data: {
      ...userToUpdate,
    },
  })

  return user
}

const deleteUserById = async (id: string, apiUserId: string) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    return await getUserById(id, apiUserId)
  }

  const user = await prisma.user.delete({
    where: {
      id,
      apiUserId,
    },
  })

  return user
}

export default {
  getAllUsers,
  getUserById,
  getAllUserPosts,
  createUser,
  updateUserById,
  deleteUserById,
}
