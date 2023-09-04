import express from "express"
import postController from "../controllers/postController"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import postValidationSchemas from "../validationSchemas/postValidationSchemas"

const router = express.Router()

// Retrieve a list of all posts.
router.get(
  "/",
  checkSchema(postValidationSchemas.getAllSchema),
  validate,
  postController.getAll
)

// Retrieve a specific post by their ID.
router.get(
  "/:id",
  checkSchema(postValidationSchemas.byIdSchema),
  validate,
  postController.getById
)

// Create a new post.
router.post(
  "/",
  checkSchema(postValidationSchemas.createSchema),
  validate,
  postController.create
)

// Update post information.
router.put(
  "/:id",
  checkSchema(postValidationSchemas.updateByIdSchema),
  validate,
  postController.updateById
)

// Delete a post.
router.delete(
  "/:id",
  checkSchema(postValidationSchemas.byIdSchema),
  validate,
  postController.deleteById
)

export default router
