import { Request } from "express-validator/src/base"
import prisma from "../client"

export const checkIfUserExists = async (
  value: string,
  { req }: { req: Request }
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: value,
      apiUserId: req.apiUserId,
    },
  })

  if (!user) {
    throw new Error("The specified user for the 'id' field does not exist.")
  }

  return true
}

export const checkIfApiUserExists = async (value: string) => {
  const user = await prisma.apiUser.findUnique({
    where: {
      id: value,
    },
  })

  if (!user) {
    throw new Error("The specified apiUser for the 'id' field does not exist.")
  }

  return true
}

export const checkIfPostExists = async (
  value: string,
  { req }: { req: Request }
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: value,
      apiUserId: req.apiUserId,
    },
  })

  if (!post) {
    throw new Error("The specified post for the 'id' field does not exist.")
  }

  return true
}

export const checkIfCommentExists = async (
  value: string,
  { req }: { req: Request }
) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: value,
      apiUserId: req.apiUserId,
    },
  })

  if (!comment) {
    throw new Error("The specified comment for the 'id' field does not exist.")
  }

  return true
}

export const checkEmailNotInUse = async (
  value: string,
  { req }: { req: Request }
) => {
  const user = await prisma.user.findUnique({
    where: {
      email_apiUserId: {
        email: value,
        apiUserId: req.apiUserId,
      },
    },
  })

  if (user) {
    throw new Error(
      "The specified email for the 'email' field is already in use."
    )
  }

  return true
}

export const checkUsernameNotInUse = async (
  value: string,
  { req }: { req: Request }
) => {
  const user = await prisma.user.findUnique({
    where: {
      username_apiUserId: {
        username: value,
        apiUserId: req.apiUserId,
      },
    },
  })

  if (user) {
    throw new Error(
      "The specified username for the 'username' field is already in use."
    )
  }

  return true
}

export const checkApiUserEmailNotInUse = async (value: string) => {
  const user = await prisma.apiUser.findUnique({
    where: {
      email: value,
    },
  })

  if (user) {
    throw new Error(
      "The specified email for the 'email' field is already in use."
    )
  }

  return true
}
