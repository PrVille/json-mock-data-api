import { Schema } from "express-validator"

const skipSchema: Schema = {
  skip: {
    optional: true,
    isArray: {
      negated: true,
      errorMessage: "Multiple values are not allowed for the 'skip' field",
    },
    isInt: {
      options: { min: 0 },
      errorMessage:
        "The 'skip' field must be an integer greater than or equal to 0.",
    },
    toInt: true,
  },
}

const takeSchema: Schema = {
  take: {
    optional: true,
    isArray: {
      negated: true,
      errorMessage: "Multiple values are not allowed for the 'take' field",
    },
    isInt: {
      options: { min: 0 },
      errorMessage:
        "The 'take' field must be an integer greater than or equal to 0.",
    },
    toInt: true,
  },
}

const ageSchema: Schema = {
  age: {
    optional: true,
    isInt: {
      options: { min: 0 },
      errorMessage:
        "The 'age' field must be an integer greater than or equal to 0.",
    },
    toInt: true,
  },
}

const imageUrlSchema: Schema = {
  imageUrl: {
    optional: true,
    isString: {
      errorMessage: "The 'imageUrl' field must be a string.",
      bail: true,
    },
    notEmpty: {
      errorMessage: "The 'imageUrl' field must be a non-empty string.",
      bail: true,
    },
    isURL: {
      errorMessage: "The 'imageUrl' field must be a valid URL.",
      bail: true,
    },
  },
}

export default { skipSchema, takeSchema, ageSchema, imageUrlSchema }
