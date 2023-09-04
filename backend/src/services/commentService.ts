import { faker } from "@faker-js/faker"
import prisma from "../client"
import { CreateCommentBody, UpdateCommentBody } from "../typings/bodies"
import { GetAllCommentsProps } from "../typings/props"
import { DEFAULT_API_USER_ID } from "../utils/config"

const getAllComments = async (
  commentsMeta: GetAllCommentsProps,
  apiUserId: string
) => {
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

const getCommentById = async (id: string, apiUserId: string) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id,
      apiUserId,
    },
  })

  return comment
}

const createComment = async (
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

const updateCommentById = async (
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

// const deletePostById = async (id: string, apiUserId: string) => {
//   if (apiUserId === DEFAULT_API_USER_ID) {
//     return await getPostById(id, apiUserId)
//   }

//   const post = await prisma.post.delete({
//     where: {
//       id,
//       apiUserId,
//     },
//   })

//   return post
// }

export default {
  getAllComments,
  getCommentById,
  createComment,
  updateCommentById, //   deletePostById
}
