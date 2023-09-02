import { Request, Response } from "express"
import { matchedData } from "express-validator"
import { AuthBody } from "../typings/bodies"
import prisma from "../client"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { SECRET } from "../utils/config"

const signUp = async (req: Request, res: Response) => {
  const { email, password } = matchedData(req) as AuthBody

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newApiUser = await prisma.apiUser.create({
    data: {
      email,
      passwordHash,
    },
  })

  const {
    passwordHash: excludedPasswordHash,
    ...newApiUserWithoutPasswordHash
  } = newApiUser

  res.json(newApiUserWithoutPasswordHash)
}

const logIn = async (req: Request, res: Response) => {
  const { email, password } = matchedData(req) as AuthBody

  const user = await prisma.apiUser.findUnique({
    where: { email },
  })

  if (!user) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: email,
          msg: "The specified user for the 'email' field does not exist.",
          path: "email",
          location: "body",
        },
      ],
    })
  }

  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return res.status(400).json({
      errors: [
        {
          type: "field",
          value: password,
          msg: "The specified password for the 'password' field is incorrect.",
          path: "password",
          location: "body",
        },
      ],
    })
  }

  const token = jwt.sign({ id: user.id }, SECRET, {
    expiresIn: 60 * 60 * 24 * 365,
  })

  const { passwordHash: excludedPasswordHash, ...apiUserWithoutPasswordHash } =
    user

  res.json({ token, ...apiUserWithoutPasswordHash })
}

export default {
  signUp,
  logIn,
}
