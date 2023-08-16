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
