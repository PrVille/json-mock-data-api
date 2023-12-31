import prisma from "../client"
import { CreateUserBody, UpdateUserBody } from "../typings/bodies"
import {
  GetAllCommentsProps,
  GetAllPostsProps,
  GetAllUsersProps,
} from "../typings/props"
import { DEFAULT_API_USER_ID } from "../utils/config"
import { faker } from "@faker-js/faker"

const getAll = async (usersMeta: GetAllUsersProps, apiUserId: string) => {
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

const getById = async (id: string, apiUserId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
      apiUserId,
    },
  })

  return user
}

const getAllPosts = async (
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

const getAllComments = async (
  userId: string,
  commentsMeta: GetAllCommentsProps,
  apiUserId: string
) => {
  const { skip, take, sortBy, sortOrder } = commentsMeta

  const comments = await prisma.comment.findMany({
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

  const total = await prisma.comment.count({
    where: {
      userId,
      apiUserId,
    },
  })

  return {
    data: comments,
    total,
    skip,
    take,
  }
}

const create = async (userToCreate: CreateUserBody, apiUserId: string) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    const mockUser = {
      id: faker.string.uuid(),
      username: userToCreate.username,
      email: userToCreate.email,
      firstName: userToCreate.firstName,
      lastName: userToCreate.lastName,
      age: userToCreate.age || null,
      imageUrl: userToCreate.imageUrl || null,
      jobTitle: userToCreate.jobTitle || null,
      bio: userToCreate.bio || null,
      country: userToCreate.country || null,
      height: userToCreate.height || null,
      weight: userToCreate.weight || null,
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

const updateById = async (
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
      jobTitle: userToUpdate.jobTitle || existingUser.jobTitle,
      bio: userToUpdate.bio || existingUser.bio,
      country: userToUpdate.country || existingUser.country,
      height: userToUpdate.height || existingUser.height,
      weight: userToUpdate.weight || existingUser.weight,
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

const deleteById = async (id: string, apiUserId: string) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    return await getById(id, apiUserId)
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
  getAll,
  getById,
  getAllPosts,
  getAllComments,
  create,
  updateById,
  deleteById,
}
