import {
  checkEmailNotInUse,
  checkUsernameNotInUse,
} from "../utils/customValidators"

const idFields = {
  exists: {
    errorMessage: "The 'id' field is a required field.",
    bail: true,
  },
  notEmpty: {
    errorMessage: "The 'id' field must be a non-empty string.",
    bail: true,
  },
}

const usernameFields = {
  isString: {
    errorMessage: "The 'username' field must be a string.",
    bail: true,
  },
  isLength: {
    options: { min: 3 },
    errorMessage: "The 'username' field must be at least 3 characters long.",
    bail: true,
  },
  custom: {
    options: checkUsernameNotInUse,
  },
}

const emailFields = {
  isString: {
    errorMessage: "The 'email' field must be a string.",
    bail: true,
  },
  isEmail: {
    errorMessage: "The 'email' field must be a valid e-mail address.",
    bail: true,
  },
  custom: {
    options: checkEmailNotInUse,
  },
}

const firstNameFields = {
  isString: {
    errorMessage: "The 'firstName' field must be a string.",
    bail: true,
  },
  notEmpty: {
    errorMessage: "The 'firstName' field must be a non-empty string.",
    bail: true,
  },
}

const lastNameFields = {
  isString: {
    errorMessage: "The 'lastName' field must be a string.",
    bail: true,
  },
  notEmpty: {
    errorMessage: "The 'lastName' field must be a non-empty string.",
    bail: true,
  },
}

export default {
  idFields,
  usernameFields,
  emailFields,
  firstNameFields,
  lastNameFields,
}
