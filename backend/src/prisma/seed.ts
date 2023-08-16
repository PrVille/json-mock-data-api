import prisma from "../client"
import {
  generateFakePostsWithoutUser,
  generateFakeUsers,
} from "../data/generators"

const main = async () => {
  await prisma.user.deleteMany()

  for (const fakeUser of generateFakeUsers(10)) {
    await prisma.user.create({
      data: {
        ...fakeUser,
        posts: {
          create: generateFakePostsWithoutUser(10),
        },
      },
    })
  }

  console.log(`Seeded db.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
