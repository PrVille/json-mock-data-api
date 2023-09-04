import express from "express"
import commentController from "../controllers/commentController"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import commentValidationSchemas from "../validationSchemas/commentValidationSchemas"

const router = express.Router()

// Retrieve a list of all comments.
router.get(
  "/",
  checkSchema(commentValidationSchemas.getAllCommentsSchema),
  validate,
  commentController.getAllComments
)

// Retrieve a specific comment by their ID.
router.get(
  "/:id",
  checkSchema(commentValidationSchemas.commentByIdSchema),
  validate,
  commentController.getCommentById
)

// Create a new comment.
router.post(
  "/",
  checkSchema(commentValidationSchemas.createCommentSchema),
  validate,
  commentController.createComment
)

// Update comment information.
router.put(
  "/:id",
  checkSchema(commentValidationSchemas.updateCommentByIdSchema),
  validate,
  commentController.updateCommentById
)

// // Delete a post.
// router.delete(
//   "/:id",
//   checkSchema(postValidationSchemas.postByIdSchema),
//   validate,
//   postController.deletePostById
// )

export default router
