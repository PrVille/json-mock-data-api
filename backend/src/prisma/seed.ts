import prisma from "../client"
import seedData from "../data/seedData"

const main = async () => {
  await prisma.user.deleteMany()

  const users = await prisma.user.createMany({
    data: seedData.users,
  })

  console.log(`Seeded ${users.count} users.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
