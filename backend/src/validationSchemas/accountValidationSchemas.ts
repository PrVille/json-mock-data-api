import { Schema } from "express-validator"
import commonValidationFields from "./commonValidationFields"
import { checkApiUserEmailNotInUse, checkIfApiUserExists } from "../utils/customValidators"

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

export default { byIdSchema, updateEmailByIdSchema }
