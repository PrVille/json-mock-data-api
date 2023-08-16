import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator"

const validate = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request)
  if (errors.isEmpty()) {
    return next()
  }

  return response.status(400).json({ errors: errors.array() })
}

export default validate
