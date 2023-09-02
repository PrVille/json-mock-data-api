import { Schema } from "express-validator"
import commonValidationSchemas from "./commonValidationSchemas"
import { SortOrder, SortPostsBy } from "../typings/enums"
import commonValidationFields from "./commonValidationFields"
import { checkIfPostExists, checkIfUserExists } from "../utils/customValidators"

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

const createPostSchema: Schema = {
  title: {
    exists: {
      errorMessage: "The 'title' field is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "The 'title' field must be a string.",
      bail: true,
    },
    notEmpty: {
      errorMessage: "The 'title' field must be a non-empty string.",
      bail: true,
    },
  },
  content: {
    exists: {
      errorMessage: "The 'content' field is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "The 'content' field must be a string.",
      bail: true,
    },
    notEmpty: {
      errorMessage: "The 'content' field must be a non-empty string.",
      bail: true,
    },
  },
  userId: {
    exists: {
      errorMessage: "The 'userId' field is a required field.",
      bail: true,
    },
    notEmpty: {
      errorMessage: "The 'userId' field must be a non-empty string.",
      bail: true,
    },
    custom: {
      options: checkIfUserExists,
      errorMessage: "The specified user for the 'userId' field does not exist.",
    },
  },
}

export default {
  getAllPostsSchema,
  postByIdSchema,
  createPostSchema,
}
