import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import prisma from "../client"
import { DEFAULT_API_USER_ID, SECRET } from "../utils/config"

const authApiUser = async (req: Request, res: Response, next: NextFunction) => {
  const tokenBearer = req.headers.authorization?.replace("Bearer ", "")
  console.log({ DEFAULT_API_USER_ID, tokenBearer })
  if (tokenBearer !== undefined) {
    try {
      const decodedToken = verify(tokenBearer, SECRET)
      const { id } = decodedToken as { id: string }

      await prisma.apiUser.findUniqueOrThrow({
        where: {
          id,
        },
      })

      req.apiUserId = id
    } catch (error) {
      return res.status(401).json({
        errors: [{ type: "auth", value: tokenBearer, msg: "Invalid token." }],
      })
    }
  } else {
    req.apiUserId = DEFAULT_API_USER_ID
  }

  next()
}

export default authApiUser
