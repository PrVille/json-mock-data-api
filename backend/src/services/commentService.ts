import { faker } from "@faker-js/faker"
import prisma from "../client"
import { CreateCommentBody, UpdateCommentBody } from "../typings/bodies"
import { GetAllCommentsProps } from "../typings/props"
import { DEFAULT_API_USER_ID } from "../utils/config"

const getAll = async (commentsMeta: GetAllCommentsProps, apiUserId: string) => {
  const { skip, take, sortBy, sortOrder } = commentsMeta

  const comments = await prisma.comment.findMany({
    where: {
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

const getById = async (id: string, apiUserId: string) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id,
      apiUserId,
    },
  })

  return comment
}

const create = async (
  commentToCreate: CreateCommentBody,
  apiUserId: string
) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    const mockComment = {
      id: faker.string.uuid(),
      content: commentToCreate.content,
      userId: commentToCreate.userId,
      postId: commentToCreate.postId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return mockComment
  }

  const comment = await prisma.comment.create({
    data: {
      ...commentToCreate,
      apiUserId,
    },
  })

  return comment
}

const updateById = async (
  id: string,
  commentToUpdate: UpdateCommentBody,
  apiUserId: string
) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    const existingComment = await prisma.comment.findUniqueOrThrow({
      where: {
        id,
        apiUserId,
      },
    })

    const mockComment = {
      id: existingComment.id,
      content: commentToUpdate.content || existingComment.content,
      userId: existingComment.userId,
      postId: existingComment.postId,
      createdAt: existingComment.createdAt,
      updatedAt: new Date(),
    }

    return mockComment
  }

  const comment = await prisma.comment.update({
    where: {
      id,
      apiUserId,
    },
    data: {
      ...commentToUpdate,
    },
  })

  return comment
}

const deleteById = async (id: string, apiUserId: string) => {
  if (apiUserId === DEFAULT_API_USER_ID) {
    return await getById(id, apiUserId)
  }

  const comment = await prisma.comment.delete({
    where: {
      id,
      apiUserId,
    },
  })

  return comment
}

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
