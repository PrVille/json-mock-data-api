import prisma from "../client"
import { GetAllPostsProps } from "../typings/props"

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

export default {
  getAllPosts,
}
