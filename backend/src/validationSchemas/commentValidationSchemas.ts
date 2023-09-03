import { Schema } from "express-validator"
import commonValidationSchemas from "./commonValidationSchemas"
import { SortCommentsBy, SortOrder } from "../typings/enums"
import commonValidationFields from "./commonValidationFields"
import { checkIfCommentExists } from "../utils/customValidators"

const getAllCommentsSchema: Schema = {
  ...commonValidationSchemas.skipSchema,
  ...commonValidationSchemas.takeSchema,
  sortBy: {
    optional: true,
    isArray: {
      negated: true,
      errorMessage: "Multiple values are not allowed for the 'sortBy' field",
    },
    isIn: {
      options: [Object.values(SortCommentsBy).map((v) => v.toString())],
      errorMessage:
        "The 'sortBy' field must be one of 'id', 'updatedAt' or 'createdAt'.",
    },
  },
  sortOrder: {
    optional: true,
    isArray: {
      negated: true,
      errorMessage: "Multiple values are not allowed for the 'sortOrder' field",
    },
    isIn: {
      options: [Object.values(SortOrder).map((v) => v.toString())],
      errorMessage: "The 'sortOrder' field must be either 'asc' or 'desc'.",
    },
  },
}

const commentByIdSchema: Schema = {
  id: {
    in: "params",
    ...commonValidationFields.idFields,
    custom: {
      options: checkIfCommentExists,
    },
  },
}

export default {
  getAllCommentsSchema,
  commentByIdSchema
}
