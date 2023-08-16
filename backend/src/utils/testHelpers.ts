import prisma from "../client"
import { generateFakeUser } from "../data/generators"

export const createTestUser = async () => {
  return await prisma.user.create({
    data: generateFakeUser(),
  })
}

export const deleteTestUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  })
}
