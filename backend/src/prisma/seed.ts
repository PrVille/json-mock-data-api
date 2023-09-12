import { faker } from "@faker-js/faker"
import prisma from "../client"
import { DEFAULT_API_USER_ID } from "../utils/config"
import seedDb from "../data/seedDb"

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
      token: faker.string.uuid()
    },
  })

  await seedDb(defaultApiUser.id)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
