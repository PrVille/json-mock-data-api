import { Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"

export const generateFakeUser = (): Omit<Prisma.UserCreateInput, "apiUser"> => {
  const includeAge = Math.floor(Math.random() * 10) > 1
  const includeImageUrl = Math.floor(Math.random() * 10) > 1

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const username = faker.internet.userName({ firstName, lastName })
  const email = faker.internet.email({ firstName, lastName })
  const age = includeAge ? faker.number.int({ min: 12, max: 100 }) : null
  const imageUrl = includeImageUrl ? faker.image.avatarGitHub() : null

  const fakeUser = {
    firstName,
    lastName,
    username,
    email,
    age,
    imageUrl,
  }

  return fakeUser
}

export const generateFakeUsers = (
  length: number
): Omit<Prisma.UserCreateInput, "apiUser">[] => {
  return Array.from({ length }, generateFakeUser)
}

export const generateFakePostWithoutUser = (): Omit<
  Prisma.PostCreateInput,
  "user" | "apiUser"
> => {
  const title = faker.lorem.sentence({ min: 3, max: 7 })
  const content = faker.lorem.paragraphs({ min: 1, max: 5 })

  const fakePost = { title, content }
  return fakePost
}

export const generateFakePostsWithoutUser = (
  amount: number
): Omit<Prisma.PostCreateInput, "user" | "apiUser">[] => {
  return Array.from({ length: amount }, generateFakePostWithoutUser)
}