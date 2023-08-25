import prisma from "../client"
import { SortOrder, SortUsersBy } from "../typings/enums"

const getAllUsers = async (
  skip: number,
  take: number,
  sortBy: SortUsersBy,
  sortOrder: SortOrder
) => {
  const users = await prisma.user.findMany({
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
  })

  const total = await prisma.user.count()

  return { data: users, total, skip, take }
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  return user
}

export default { getAllUsers, getUserById }
