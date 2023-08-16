import { Schema } from "express-validator"
import { checkIfUserExists } from "../utils/customValidators"

const getAllUsersSchema: Schema = {}

const getUserByIdSchema: Schema = {
  id: {
    notEmpty: {
      errorMessage: "The 'id' field must be a non-empty string.",
      bail: true,
    },
    custom: {
      options: checkIfUserExists,
    },
  },
}

export default { getAllUsersSchema, getUserByIdSchema }
