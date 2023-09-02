import { faker } from "@faker-js/faker"
import prisma from "../client"
import {
  generateFakeComment,
  generateFakePostsWithoutUser,
  generateFakeUsers,
} from "../data/generators"
import { DEFAULT_API_USER_ID } from "../utils/config"

// TODO: More sophisticated seed
const main = async () => {
  const defaultApiUser = await prisma.apiUser.upsert({
    where: {
      id: DEFAULT_API_USER_ID,
    },
    update: {},
    create: {
      id: DEFAULT_API_USER_ID,
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
    },
  })

  await prisma.user.deleteMany()

  for (const fakeUser of generateFakeUsers(10)) {
    const user = await prisma.user.create({
      data: {
        ...fakeUser,
        apiUserId: DEFAULT_API_USER_ID,
      },
    })

    for (const fakePost of generateFakePostsWithoutUser(10)) {
      const post = await prisma.post.create({
        data: {
          ...fakePost,
          userId: user.id,
          apiUserId: DEFAULT_API_USER_ID,
        },
      })
    }
  }

  const users = await prisma.user.findMany()
  const posts = await prisma.post.findMany()

  for (const user of users) {
    for (const post of posts) {
      if (post.userId !== user.id) {
        const comment = await prisma.comment.create({
          data: {
            ...generateFakeComment(post.id, user.id, DEFAULT_API_USER_ID)
          }
        })
      }
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
