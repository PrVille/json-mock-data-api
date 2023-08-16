import { Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"

export const generateFakeUser = (): Prisma.UserCreateInput => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const username = faker.internet.userName({ firstName, lastName })
  const email = faker.internet.email({ firstName, lastName })

  const fakeUser = { firstName, lastName, username, email }
  return fakeUser
}

export const generateFakeUsers = (amount: number): Prisma.UserCreateInput[] => {
  return Array.from({ length: amount }, generateFakeUser)
}

export const generateFakePostWithoutUser = (): Omit<
  Prisma.PostCreateInput,
  "user"
> => {
  const title = faker.lorem.sentence({ min: 3, max: 7 })
  const content = faker.lorem.paragraphs({ min: 1, max: 5 })

  const fakePost = { title, content }
  return fakePost
}

export const generateFakePostsWithoutUser = (
  amount: number
): Omit<Prisma.PostCreateInput, "user">[] => {
  return Array.from({ length: amount }, generateFakePostWithoutUser)
}
