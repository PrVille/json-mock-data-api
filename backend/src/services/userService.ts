import prisma from "../client"

const getAllUsers = async () => {
  const users = await prisma.user.findMany()
  return users
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } })
  return user
}

export default { getAllUsers, getUserById }
