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

// Login API User.
router.post(
  "/login",
  checkSchema(authValidationSchemas.logInSchema),
  validate,
  authController.logIn
)

export default router
