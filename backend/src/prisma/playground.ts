import { faker } from "@faker-js/faker"
import prisma from "../client"
import { DEFAULT_API_USER_ID } from "../utils/config"
import seedDb from "../data/seedDb"

const playground = async () => {
  const userCount = await prisma.user.count()
  const postCount = await prisma.post.count()
  const commentCount = await prisma.comment.count()
  console.log({ userCount, postCount, commentCount })

  const t0 = performance.now()

  await prisma.user.deleteMany()

  const t1 = performance.now()
  console.log(`Call to remove all took ${t1 - t0} milliseconds.`)
}

playground()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
