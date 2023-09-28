import { Schema } from "express-validator"
import commonValidationFields from "./commonValidationFields"
import {
  checkApiUserEmailNotInUse,
  checkIfApiUserExists,
} from "../utils/customValidators"

const byIdSchema: Schema = {
  id: {
    in: "params",
    ...commonValidationFields.idFields,
    custom: {
      options: checkIfApiUserExists,
    },
  },
}

const updateEmailByIdSchema: Schema = {
  ...byIdSchema,
  email: {
    exists: {
      errorMessage: "The 'email' field is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "The 'email' field must be a string.",
      bail: true,
    },
    isEmail: {
      errorMessage: "The 'email' field must be a valid e-mail address.",
      bail: true,
    },
    custom: {
      options: checkApiUserEmailNotInUse,
    },
  },
}

const updatePasswordByIdSchema: Schema = {
  ...byIdSchema,
  oldPassword: {
    exists: {
      errorMessage: "The 'oldPassword' field is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "The 'oldPassword' field must be a string.",
      bail: true,
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "The 'oldPassword' field must be at least 5 characters long.",
      bail: true,
    },
  },
  newPassword: {
    exists: {
      errorMessage: "The 'newPassword' field is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "The 'newPassword' field must be a string.",
      bail: true,
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "The 'newPassword' field must be at least 5 characters long.",
      bail: true,
    },
  },
}

export default { byIdSchema, updateEmailByIdSchema, updatePasswordByIdSchema }
