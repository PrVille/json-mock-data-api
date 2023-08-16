import { Prisma } from "@prisma/client"
import { generateFakeUser } from "./generators"

const users: Prisma.UserCreateInput[] = Array.from(
  { length: 10 },
  generateFakeUser
)

const seedData = {
  users,
}

export default seedData
