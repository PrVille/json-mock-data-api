import express from "express"
import userController from "../controllers/userController"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import userValidationSchemas from "../validationSchemas/userValidationSchemas"

const router = express.Router()

// Retrieve a list of all users.
router.get(
  "/",
  checkSchema(userValidationSchemas.getAllUsersSchema),
  validate,
  userController.getAllUsers
)

// Retrieve a specific user by their ID.
router.get(
  "/:id",
  checkSchema(userValidationSchemas.userByIdSchema),
  validate,
  userController.getUserById
)

// Retrieve a list of all posts for user.
router.get(
  "/:id/posts",
  checkSchema(userValidationSchemas.getAllUserPostsSchema),
  validate,
  userController.getAllUserPosts
)

// Create a new user.
router.post(
  "/",
  checkSchema(userValidationSchemas.createUserSchema),
  validate,
  userController.createUser
)

// Update user's information.
router.put(
  "/:id",
  checkSchema(userValidationSchemas.updateUserByIdSchema),
  validate,
  userController.updateUserById
)

// Delete a user.
router.delete(
  "/:id",
  checkSchema(userValidationSchemas.userByIdSchema),
  validate,
  userController.deleteUserById
)

export default router
