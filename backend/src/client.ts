import { Prisma, PrismaClient } from "@prisma/client"

const excludeFromResults = Prisma.defineExtension({
  name: "excludeFromResults",
  result: {
    $allModels: {
      apiUserId: {
        needs: {},
        compute() {
          return undefined
        },
      },
    },
  },
})

const prisma = new PrismaClient().$extends(excludeFromResults)

export default prisma
