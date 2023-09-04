import express from "express"
import commentController from "../controllers/commentController"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import commentValidationSchemas from "../validationSchemas/commentValidationSchemas"

const router = express.Router()

// Retrieve a list of all comments.
router.get(
  "/",
  checkSchema(commentValidationSchemas.getAllSchema),
  validate,
  commentController.getAll
)

// Retrieve a specific comment by their ID.
router.get(
  "/:id",
  checkSchema(commentValidationSchemas.byIdSchema),
  validate,
  commentController.getById
)

// Create a new comment.
router.post(
  "/",
  checkSchema(commentValidationSchemas.createSchema),
  validate,
  commentController.create
)

// Update comment information.
router.put(
  "/:id",
  checkSchema(commentValidationSchemas.updateByIdSchema),
  validate,
  commentController.updateById
)

// Delete a comment.
router.delete(
  "/:id",
  checkSchema(commentValidationSchemas.byIdSchema),
  validate,
  commentController.deleteById
)

export default router
