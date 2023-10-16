import { Prisma } from "@prisma/client"

export type AuthBody = {
  email: string
  password: string
}

export type CreateUserBody = Pick<
  Prisma.UserCreateInput,
  | "email"
  | "username"
  | "firstName"
  | "lastName"
  | "age"
  | "imageUrl"
  | "jobTitle"
  | "bio"
  | "country"
  | "height"
  | "weight"
>

export type UpdateUserBody = Partial<CreateUserBody>

export type CreatePostBody = Pick<
  Prisma.PostUncheckedCreateInput,
  "title" | "content" | "userId"
>

export type UpdatePostBody = Partial<Omit<CreatePostBody, "userId">>

export type CreateCommentBody = Pick<
  Prisma.CommentUncheckedCreateInput,
  "content" | "userId" | "postId"
>

export type UpdateCommentBody = Partial<
  Omit<CreateCommentBody, "userId" | "postId">
>
