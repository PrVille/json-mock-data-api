import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import prisma from "../client"
import { SECRET } from "../utils/config"

const authApiUser = async (req: Request, res: Response, next: NextFunction) => {
  const tokenBearer = req.headers.authorization?.replace("Bearer ", "")

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
    return res.status(401).json({
      errors: [{ type: "auth", value: tokenBearer, msg: "Missing token." }],
    })
  }

  next()
}

export default authApiUser
