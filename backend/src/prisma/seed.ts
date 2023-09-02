import { faker } from "@faker-js/faker"
import prisma from "../client"
import {
  generateFakePostsWithoutUser,
  generateFakeUsers,
} from "../data/generators"
import {
  DEFAULT_API_USER_ID,
} from "../utils/config"

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
    await prisma.user.create({
      data: {
        ...fakeUser,
        apiUserId: DEFAULT_API_USER_ID,
        posts: {
          create: generateFakePostsWithoutUser(10).map((post) => ({
            ...post,
            apiUserId: DEFAULT_API_USER_ID,
          })),
        },
      },
    })
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
