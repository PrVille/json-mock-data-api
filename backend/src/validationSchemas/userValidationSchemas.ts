import { Schema } from "express-validator"
import commonValidationFields from "./commonValidationFields"
import commonValidationSchemas from "./commonValidationSchemas"
import postValidationSchemas from "./postValidationSchemas"
import { checkIfUserExists } from "../utils/customValidators"
import { SortOrder, SortUsersBy } from "../typings/enums"

const getAllSchema: Schema = {
  ...commonValidationSchemas.skipSchema,
  ...commonValidationSchemas.takeSchema,
  sortBy: {
    optional: true,
    isArray: {
      negated: true,
      errorMessage: "Multiple values are not allowed for the 'sortBy' field",
    },
    isIn: {
      options: [Object.values(SortUsersBy).map((v) => v.toString())],
      errorMessage:
        "The 'sortBy' field must be one of 'id', 'username', 'email', 'firstName', 'lastName', 'age', 'updatedAt' or 'createdAt'.",
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

const byIdSchema: Schema = {
  id: {
    in: "params",
    ...commonValidationFields.idFields,
    custom: {
      options: checkIfUserExists,
    },
  },
}

const getAllPostsSchema: Schema = {
  ...byIdSchema,
  ...postValidationSchemas.getAllSchema,
}

const updateByIdSchema: Schema = {
  ...byIdSchema,
  email: {
    optional: true,
    ...commonValidationFields.emailFields,
  },
  username: {
    optional: true,
    ...commonValidationFields.usernameFields,
  },
  firstName: {
    optional: true,
    ...commonValidationFields.firstNameFields,
  },
  lastName: {
    optional: true,
    ...commonValidationFields.lastNameFields,
  },
  ...commonValidationSchemas.ageSchema,
  ...commonValidationSchemas.imageUrlSchema,
}

const createSchema: Schema = {
  email: {
    exists: {
      errorMessage: "The 'email' field is a required field.",
      bail: true,
    },
    ...commonValidationFields.emailFields,
  },
  username: {
    exists: {
      errorMessage: "The 'username' field is a required field.",
      bail: true,
    },
    ...commonValidationFields.usernameFields,
  },
  firstName: {
    exists: {
      errorMessage: "The 'firstName' field is a required field.",
      bail: true,
    },
    ...commonValidationFields.firstNameFields,
  },
  lastName: {
    exists: {
      errorMessage: "The 'lastName' field is a required field.",
      bail: true,
    },
    ...commonValidationFields.lastNameFields,
  },
  ...commonValidationSchemas.ageSchema,
  ...commonValidationSchemas.imageUrlSchema,
}

export default {
  getAllSchema,
  byIdSchema,
  getAllPostsSchema,
  updateByIdSchema,
  createSchema,
}
