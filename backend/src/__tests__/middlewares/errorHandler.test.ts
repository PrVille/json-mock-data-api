import { Request, Response, NextFunction } from "express"
import errorHandler from "../../middlewares/errorHandler"

describe("errorHandler", () => {
  it("should respond with status 500 and error message for Error instance", () => {
    const responseMock: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }

    const error = new Error("This is an error message")

    errorHandler(
      error,
      {} as Request,
      responseMock as Response,
      {} as NextFunction
    )

    expect(responseMock.status).toHaveBeenCalledWith(500)
    expect(responseMock.json).toHaveBeenCalledWith({
      error: "This is an error message",
    })
  })

  it("should call the next middleware for non-Error values", () => {
    const nextMock: NextFunction = jest.fn()

    const nonErrorValue = "Not an Error instance"

    errorHandler(nonErrorValue, {} as Request, {} as Response, nextMock)

    expect(nextMock).toHaveBeenCalled()
  })
})
