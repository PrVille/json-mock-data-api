import { Schema } from "express-validator"
import commonValidationSchemas from "./commonValidationSchemas"
import { SortCommentsBy, SortOrder } from "../typings/enums"
import commonValidationFields from "./commonValidationFields"
import { checkIfCommentExists, checkIfPostExists, checkIfUserExists } from "../utils/customValidators"

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

const createCommentSchema: Schema = {
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
  postId: {
    exists: {
      errorMessage: "The 'postId' field is a required field.",
      bail: true,
    },
    notEmpty: {
      errorMessage: "The 'postId' field must be a non-empty string.",
      bail: true,
    },
    custom: {
      options: checkIfPostExists,
      errorMessage: "The specified post for the 'postId' field does not exist.",
    },
  },
}

export default {
  getAllCommentsSchema,
  commentByIdSchema,
  createCommentSchema
}
