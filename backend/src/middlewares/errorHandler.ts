import { ErrorRequestHandler, Request, Response, NextFunction } from "express"

const errorHandler: ErrorRequestHandler = (
  error: unknown,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof Error) {
    return response.status(500).json({ error: error.message })
  }

  next(error)
}


export default errorHandler