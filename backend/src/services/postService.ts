import { faker } from "@faker-js/faker"
import prisma from "../client"
import { CreatePostBody } from "../typings/bodies"
import { GetAllPostsProps } from "../typings/props"
import { DEFAULT_API_USER_ID } from "../utils/config"
import { Post } from "@prisma/client"

const getAllPosts = async (postsMeta: GetAllPostsProps, apiUserId: string) => {
  const { skip, take, sortBy, sortOrder } = postsMeta

  const posts = await prisma.post.findMany({
    where: {
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

const getPostById = async (id: string, apiUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
      apiUserId,
    },
  })

  return post
}

const createPost = async (postToCreate: CreatePostBody, apiUserId: string) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    const mockPost = {
      id: faker.string.uuid(),
      title: postToCreate.title,
      content: postToCreate.content,
      userId: postToCreate.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return mockPost
  }

  const post = await prisma.post.create({
    data: {
      ...postToCreate,
      apiUserId,
    },
  })

  return post
}

export default {
  getAllPosts,
  getPostById,
  createPost
}