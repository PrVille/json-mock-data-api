import prisma from "../client"
import { IncludeInUser } from "../typings/enums"

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

export const validateIncludeInUser = (
  values: string | string[]
): IncludeInUser[] => {
  if (!values) return []

  if (!Array.isArray(values)) {
    values = [values]
  }

  const invalidValues = values.filter(
    (value) => !Object.values(IncludeInUser).includes(value as IncludeInUser)
  )

  if (invalidValues.length > 0) {
    throw new Error(
      "The 'include' field must be one or more of 'posts', '', or ''."
    )
  }

  return values as IncludeInUser[]
}
