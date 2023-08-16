import { Schema } from "express-validator"
import {
  checkIfUserExists,
  validateIncludeInUser,
} from "../utils/customValidators"
import { SortOrder, SortUsersBy } from "../typings/enums"

const getAllUsersSchema: Schema = {
  skip: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage:
        "The 'skip' field must be an integer greater than or equal to 0.",
    },
    toInt: true,
  },
  take: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage:
        "The 'take' field must be an integer greater than or equal to 0.",
    },
    toInt: true,
  },
  sortBy: {
    optional: true,
    isIn: {
      options: [Object.values(SortUsersBy).map((v) => v.toString())],
      errorMessage:
        "The 'sortBy' field must be one of 'id', 'username', or 'lastName'.",
    },
  },
  sortOrder: {
    optional: true,
    isIn: {
      options: [Object.values(SortOrder).map((v) => v.toString())],
      errorMessage: "The 'sortOrder' field must be either 'asc' or 'desc'.",
    },
  },
  include: {
    custom: {
      options: validateIncludeInUser,
    },
    toArray: true,
  },
}

const getUserByIdSchema: Schema = {
  id: {
    notEmpty: {
      errorMessage: "The 'id' field must be a non-empty string.",
      bail: true,
    },
    custom: {
      options: checkIfUserExists,
      bail: true,
    },
  },
  include: {
    custom: {
      options: validateIncludeInUser,
    },
    toArray: true,
  },
}

export default { getAllUsersSchema, getUserByIdSchema }
