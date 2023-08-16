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
