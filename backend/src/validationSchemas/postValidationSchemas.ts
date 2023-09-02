import { Schema } from "express-validator"
import commonValidationSchemas from "./commonValidationSchemas"
import { SortOrder, SortPostsBy } from "../typings/enums"
import commonValidationFields from "./commonValidationFields"
import { checkIfPostExists } from "../utils/customValidators"

const getAllPostsSchema: Schema = {
  ...commonValidationSchemas.skipSchema,
  ...commonValidationSchemas.takeSchema,
  sortBy: {
    optional: true,
    isArray: {
      negated: true,
      errorMessage: "Multiple values are not allowed for the 'sortBy' field",
    },
    isIn: {
      options: [Object.values(SortPostsBy).map((v) => v.toString())],
      errorMessage:
        "The 'sortBy' field must be one of 'id', 'title', 'updatedAt' or 'createdAt'.",
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


const postByIdSchema: Schema = {
  id: {
    in: "params",
    ...commonValidationFields.idFields,
    custom: {
      options: checkIfPostExists,
    },
  },
}

export default {
  getAllPostsSchema,
  postByIdSchema
}
