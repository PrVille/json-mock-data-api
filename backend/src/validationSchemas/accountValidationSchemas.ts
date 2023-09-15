import { Schema } from "express-validator"
import commonValidationFields from "./commonValidationFields"
import { checkIfApiUserExists } from "../utils/customValidators"

const byIdSchema: Schema = {
  id: {
    in: "params",
    ...commonValidationFields.idFields,
    custom: {
      options: checkIfApiUserExists,
    },
  },
}

export default { byIdSchema }
