import { Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"

export const generateFakeUser = (): Omit<Prisma.UserCreateInput, "apiUser"> => {
  const includeAge = Math.floor(Math.random() * 10) > 1
  const includeImageUrl = Math.floor(Math.random() * 10) > 1
  const randomDate = faker.date.recent({ days: 365 })

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const username = faker.internet.userName({ firstName, lastName })
  const email = faker.internet.email({ firstName, lastName })
  const age = includeAge ? faker.number.int({ min: 12, max: 100 }) : null
  const imageUrl = includeImageUrl ? faker.image.avatarGitHub() : null
  const createdAt = randomDate
  const updatedAt = randomDate

  const fakeUser = {
    firstName,
    lastName,
    username,
    email,
    age,
    imageUrl,
    createdAt,
    updatedAt,
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
  const randomDate = faker.date.recent({ days: 365 })
  const createdAt = randomDate
  const updatedAt = randomDate

  const fakePost = { title, content, createdAt, updatedAt }
  return fakePost
}

export const generateFakePostsWithoutUser = (
  amount: number
): Omit<Prisma.PostCreateInput, "user" | "apiUser">[] => {
  return Array.from({ length: amount }, generateFakePostWithoutUser)
}

export const generateFakeComment = (
  postId: string,
  userId: string,
  apiUserId: string
): Prisma.CommentUncheckedCreateInput => {
  const content = faker.lorem.sentence({ min: 1, max: 7 })
  const randomDate = faker.date.recent({ days: 365 })
  const createdAt = randomDate
  const updatedAt = randomDate

  const fakeComment = {
    content,
    postId,
    userId,
    apiUserId,
    createdAt,
    updatedAt,
  }

  return fakeComment
}
