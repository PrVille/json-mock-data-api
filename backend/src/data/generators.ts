import { Prisma } from "@prisma/client"
import { faker } from "@faker-js/faker"

export const generateFakeUser = (): Omit<Prisma.UserCreateInput, "apiUser"> => {
  const randomDate = faker.date.recent({ days: 365 })

  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const username = faker.internet.userName({ firstName, lastName })
  const email = faker.internet.email({ firstName, lastName })
  const age = faker.number.int({ min: 12, max: 100 })
  const imageUrl = faker.image.avatarGitHub()
  const jobTitle = faker.person.jobTitle()
  const bio = faker.person.bio()
  const country = faker.location.country()
  const height = faker.number.float({ min: 100, max: 220, precision: 0.1 })
  const weight = faker.number.float({ min: 30, max: 200, precision: 0.1 })

  const createdAt = randomDate
  const updatedAt = randomDate

  const fakeUser = {
    firstName,
    lastName,
    username,
    email,
    age,
    imageUrl,
    jobTitle,
    bio,
    country,
    height,
    weight,
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
