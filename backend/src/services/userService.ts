import prisma from "../client"
import { IncludeInUser, SortOrder, SortUsersBy } from "../typings/enums"
import { buildSelectObject } from "../utils/helpers"

const getAllUsers = async (
  skip: number,
  take: number,
  sortBy: SortUsersBy,
  sortOrder: SortOrder,
  include: IncludeInUser[]
) => {
  const includeValues = Object.values(include).map((value) => value.toString())
  const select = buildSelectObject(includeValues)
  const users = await prisma.user.findMany({
    skip,
    take,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: select,
  })

  const total = await prisma.user.count()

  return { data: users, total, skip, take }
}

const getUserById = async (id: string, include: IncludeInUser[]) => {
  const includeValues = Object.values(include).map((value) => value.toString())
  const select = buildSelectObject(includeValues)

  const user = await prisma.user.findUnique({
    where: { id },
    include: select,
  })
  return user
}

export default { getAllUsers, getUserById }
