import express from "express"
import userController from "../controllers/userController"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import userValidationSchemas from "../validationSchemas/userValidationSchemas"

const router = express.Router()

// Retrieve a list of all users.
router.get(
  "/",
  checkSchema(userValidationSchemas.getAllSchema),
  validate,
  userController.getAll
)

// Retrieve a specific user by their ID.
router.get(
  "/:id",
  checkSchema(userValidationSchemas.byIdSchema),
  validate,
  userController.getById
)

// Retrieve a list of all posts for user.
router.get(
  "/:id/posts",
  checkSchema(userValidationSchemas.getAllPostsSchema),
  validate,
  userController.getAllPosts
)

// Retrieve a list of all comments for user.
router.get(
  "/:id/comments",
  checkSchema(userValidationSchemas.getAllCommentsSchema),
  validate,
  userController.getAllComments
)

// Create a new user.
router.post(
  "/",
  checkSchema(userValidationSchemas.createSchema),
  validate,
  userController.create
)

// Update user's information.
router.put(
  "/:id",
  checkSchema(userValidationSchemas.updateByIdSchema),
  validate,
  userController.updateById
)

// Delete a user.
router.delete(
  "/:id",
  checkSchema(userValidationSchemas.byIdSchema),
  validate,
  userController.deleteById
)

export default router
