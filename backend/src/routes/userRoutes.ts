import express from "express"
import userController from "../controllers/userController"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import userValidationSchemas from "../validationSchemas/userValidationSchemas"

const router = express.Router()

router.get(
  "/",
  checkSchema(userValidationSchemas.getAllUsersSchema),
  validate,
  userController.getAllUsers
)

router.get(
  "/:id",
  checkSchema(userValidationSchemas.getUserByIdSchema),
  validate,
  userController.getUserById
)

export default router
