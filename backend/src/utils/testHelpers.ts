import { faker } from "@faker-js/faker"
import prisma from "../client"
import { DEFAULT_API_USER_ID } from "./config"
import jwt from "jsonwebtoken"
import { SECRET } from "../utils/config"

const uuid = () => {
  return faker.string.uuid()
}

export const createTestApiUser = async () => {
  return await prisma.apiUser.create({
    data: {
      email: uuid() + "@test.com",
      passwordHash: faker.internet.password(),
    },
  })
}

export const deleteTestApiUser = async (id: string) => {
  return await prisma.apiUser.delete({
    where: {
      id,
    },
  })
}

export const createTestTokenForApiUser = (id: string) => {
  const token = jwt.sign({ id }, SECRET, {
    expiresIn: 60 * 60 * 24 * 365,
  })

  return token
}

export const getAllUsers = async (apiUserId = DEFAULT_API_USER_ID) => {
  return await prisma.user.findMany({
    where: {
      apiUserId,
    },
  })
}

export const createTestUser = async (apiUserId = DEFAULT_API_USER_ID) => {
  return await prisma.user.create({
    data: {
      username: uuid(),
      email: uuid() + "@test.com",
      firstName: uuid(),
      lastName: uuid(),
      age: faker.number.int({ min: 0, max: 100 }),
      imageUrl: faker.image.avatarGitHub(),
      apiUserId,
    },
  })
}

export const deleteTestUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  })
}

export const createTestPost = async (
  userId: string,
  apiUserId = DEFAULT_API_USER_ID
) => {
  return await prisma.post.create({
    data: {
      title: "title",
      content: "content",
      userId,
      apiUserId,
    },
  })
}

export const deleteTestPost = async (id: string) => {
  return await prisma.post.delete({
    where: {
      id,
    },
  })
}

export const createTestComment = async (
  userId: string,
  postId: string,
  apiUserId = DEFAULT_API_USER_ID
) => {
  return await prisma.comment.create({
    data: {
      content: "content",
      userId,
      postId,
      apiUserId,
    },
  })
}

export const deleteTestComment = async (id: string) => {
  return await prisma.comment.delete({
    where: {
      id,
    },
  })
}