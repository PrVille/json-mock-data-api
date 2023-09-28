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

// Update API User email.
router.post(
  "/:id/update/email",
  checkSchema(accountValidationSchemas.updateEmailByIdSchema),
  validate,
  accountController.updateEmailById
)

// Update API User password.
router.post(
  "/:id/update/password",
  checkSchema(accountValidationSchemas.updatePasswordByIdSchema),
  validate,
  accountController.updatePasswordById
)

// Reset API User resources (Reset database for API User).
router.post(
  "/:id/resources",
  checkSchema(accountValidationSchemas.byIdSchema),
  validate,
  accountController.resetResources
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
