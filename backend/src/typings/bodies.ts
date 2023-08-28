import { Prisma } from "@prisma/client"

export type CreateUserBody = Pick<
  Prisma.UserCreateInput,
  "email" | "username" | "firstName" | "lastName" | "age" | "imageUrl"
>

export type UpdateUserBody = Partial<CreateUserBody>
