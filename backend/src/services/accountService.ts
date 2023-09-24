import prisma from "../client"

const deleteById = async (id: string) => {
  const apiUser = await prisma.apiUser.delete({
    where: {
      id,
    },
  })

  const { passwordHash: excludedPasswordHash, ...apiUserWithoutPasswordHash } =
    apiUser

  return apiUserWithoutPasswordHash
}

const getResources = async (id: string) => {
  const where = { where: { apiUserId: id } }

  const usersCount = await prisma.user.count(where)
  const postsCount = await prisma.post.count(where)
  const commentsCount = await prisma.comment.count(where)

  return {
    resources: [
      { name: "Users", count: usersCount },
      { name: "Posts", count: postsCount },
      { name: "Comments", count: commentsCount },
    ],
  }
}

const deleteResources = async (id: string) => {
  const where = { where: { apiUserId: id } }

  const comments = await prisma.comment.deleteMany(where)
  const posts = await prisma.post.deleteMany(where)
  const users = await prisma.user.deleteMany(where)

  return {
    users,
    posts,
    comments,
  }
}

export default {
  deleteById,
  getResources,
  deleteResources,
}
