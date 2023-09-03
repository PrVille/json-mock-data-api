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

// // Create a new post.
// router.post(
//   "/",
//   checkSchema(postValidationSchemas.createPostSchema),
//   validate,
//   postController.createPost
// )

// // Update post information.
// router.put(
//   "/:id",
//   checkSchema(postValidationSchemas.updatePostByIdSchema),
//   validate,
//   postController.updatePostById
// )

// // Delete a post.
// router.delete(
//   "/:id",
//   checkSchema(postValidationSchemas.postByIdSchema),
//   validate,
//   postController.deletePostById
// )

export default router
