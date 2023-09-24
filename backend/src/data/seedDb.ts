import prisma from "../client"
import {
  generateFakeComment,
  generateFakePostsWithoutUser,
  generateFakeUsers,
} from "../data/generators"

// TODO: More sophisticated seed
const seedDb = async (apiUserId: string) => {
  const where = {
    where: {
      apiUserId,
    },
  }

  const deletedCommentsCount = await prisma.comment.deleteMany(where)
  const deletedPostsCount = await prisma.post.deleteMany(where)
  const deletedUsersCount = await prisma.user.deleteMany(where)

  for (const fakeUser of generateFakeUsers(10)) {
    const user = await prisma.user.create({
      data: {
        ...fakeUser,
        apiUserId,
      },
    })

    for (const fakePost of generateFakePostsWithoutUser(10)) {
      const post = await prisma.post.create({
        data: {
          ...fakePost,
          userId: user.id,
          apiUserId,
        },
      })
    }
  }

  const users = await prisma.user.findMany(where)
  const posts = await prisma.post.findMany(where)

  for (const user of users) {
    const commentsToCreate = 25

    for (let i = 0; i < commentsToCreate; i++) {
      const randomPost = posts[Math.floor(Math.random() * posts.length)]
      const comment = await prisma.comment.create({
        data: {
          ...generateFakeComment(randomPost.id, user.id, apiUserId),
        },
      })
    }
  }

  const usersCount = await prisma.user.count(where)
  const postsCount = await prisma.post.count(where)
  const commentsCount = await prisma.comment.count(where)

  return {
    deleted: {
      users: deletedUsersCount,
      posts: deletedPostsCount,
      comments: deletedCommentsCount,
    },
    created: {
      users: usersCount,
      posts: postsCount,
      comments: commentsCount,
    },
  }
}

export default seedDb
