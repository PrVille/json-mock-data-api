import { faker } from "@faker-js/faker"
import prisma from "../client"
import { CreateCommentBody } from "../typings/bodies"
import { GetAllCommentsProps } from "../typings/props"
import { DEFAULT_API_USER_ID } from "../utils/config"

const getAllComments = async (commentsMeta: GetAllCommentsProps, apiUserId: string) => {
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

const createComment = async (commentToCreate: CreateCommentBody, apiUserId: string) => {
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

// const updatePostById = async (
//   id: string,
//   postToUpdate: UpdatePostBody,
//   apiUserId: string
// ) => {
//   if (apiUserId === DEFAULT_API_USER_ID) {
//     const existingPost = await prisma.post.findUniqueOrThrow({
//       where: {
//         id,
//         apiUserId,
//       },
//     })

//     const mockPost = {
//       id: existingPost.id,
//       title: postToUpdate.title || existingPost.title,
//       content: postToUpdate.content || existingPost.content,
//       userId: existingPost.userId,
//       createdAt: existingPost.createdAt,
//       updatedAt: new Date(),
//     }

//     return mockPost
//   }

//   const post = await prisma.post.update({
//     where: {
//       id,
//       apiUserId,
//     },
//     data: {
//       ...postToUpdate,
//     },
//   })

//   return post
// }

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
//   updatePostById,
//   deletePostById
}
