import prisma from "../client"

export const checkIfUserExists = async (value: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: value,
    },
  })

  if (!user) {
    throw new Error("The specified user for the 'id' field does not exist.")
  }

  return true
}

export const checkEmailNotInUse  = async (value: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: value,
    },
  })

  if (user) {
    throw new Error("The specified email for the 'email' field is already in use.")
  }

  return true
}

export const checkUsernameNotInUse  = async (value: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: value,
    },
  })

  if (user) {
    throw new Error("The specified username for the 'username' field is already in use.")
  }

  return true
}