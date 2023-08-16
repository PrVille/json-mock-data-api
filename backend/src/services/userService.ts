import prisma from "../client"

const getAllUsers = async () => {
  return await prisma.user.findMany()
}

export default { getAllUsers }
