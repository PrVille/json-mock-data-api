import express from "express"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import accountValidationSchemas from "../validationSchemas/accountValidationSchemas"
import accountController from "../controllers/accountController"

const router = express.Router()

// Get API User resources.
router.get(
  "/:id/resources",
  checkSchema(accountValidationSchemas.byIdSchema),
  validate,
  accountController.getResources
)

// Delete API User resources (Clear database for API User).
router.delete(
  "/:id/resources",
  checkSchema(accountValidationSchemas.byIdSchema),
  validate,
  accountController.deleteResources
)

// Delete API User.
router.delete(
  "/:id",
  checkSchema(accountValidationSchemas.byIdSchema),
  validate,
  accountController.deleteById
)

export default router
