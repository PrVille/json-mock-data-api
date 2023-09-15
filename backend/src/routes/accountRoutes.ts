import express from "express"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import accountValidationSchemas from "../validationSchemas/accountValidationSchemas"
import accountController from "../controllers/accountController"

const router = express.Router()

// Delete API User.
router.delete(
  "/:id",
  checkSchema(accountValidationSchemas.byIdSchema),
  validate,
  accountController.deleteById
)

export default router
