import prisma from "../client"
import {
  generateFakeComment,
  generateFakePostsWithoutUser,
  generateFakeUsers,
} from "../data/generators"

// TODO: More sophisticated seed
const seedDb = async (apiUserId: string) => {
  await prisma.user.deleteMany({
    where: {
      apiUserId,
    },
  })

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

  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()

  for (const user of users) {
    const randomPost = posts[Math.floor(Math.random() * posts.length)]
    const comment = await prisma.comment.create({
      data: {
        ...generateFakeComment(randomPost.id, user.id, apiUserId),
      },
    })
  }
}

export default seedDb
