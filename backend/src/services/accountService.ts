import prisma from "../client"

const deleteById = async (id: string) => {
  const apiUser = await prisma.apiUser.delete({
    where: {
      id,
    },
  })

  const { passwordHash: excludedPasswordHash, ...apiUserWithoutPasswordHash } =
    apiUser

  return apiUserWithoutPasswordHash
}

export default {
  deleteById,
}
