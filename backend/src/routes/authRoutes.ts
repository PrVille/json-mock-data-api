import express from "express"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import authValidationSchemas from "../validationSchemas/authValidationSchemas"
import authController from "../controllers/authController"

const router = express.Router()

// Create a new API User.
router.post(
  "/signup",
  checkSchema(authValidationSchemas.signUpSchema), 
  validate,
  authController.signUp
)

// Sign in API User.
router.post(
  "/signin",
  checkSchema(authValidationSchemas.signInSchema),
  validate,
  authController.signIn
)

export default router
