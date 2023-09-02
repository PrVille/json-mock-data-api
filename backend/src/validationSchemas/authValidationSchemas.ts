import { Schema } from "express-validator"
import { checkApiUserEmailNotInUse } from "../utils/customValidators"

const signUpSchema: Schema = {
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
  password: {
    exists: {
      errorMessage: "The 'password' field is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "The 'password' field must be a string.",
      bail: true,
    },
    isLength: {
      options: { min: 5 },
      errorMessage: "The 'password' field must be at least 5 characters long.",
      bail: true,
    },
  },
}

const logInSchema: Schema = {
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
  },
  password: {
    exists: {
      errorMessage: "The 'password' field is a required field.",
      bail: true,
    },
    isString: {
      errorMessage: "The 'password' field must be a string.",
      bail: true,
    },
    notEmpty: {
      errorMessage: "The 'password' field must be a non-empty string.",
      bail: true,
    },
  },
}

export default {
  signUpSchema,
  logInSchema,
}
