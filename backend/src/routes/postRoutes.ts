import express from "express"
import postController from "../controllers/postController"
import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"
import postValidationSchemas from "../validationSchemas/postValidationSchemas"

const router = express.Router()

// Retrieve a list of all posts.
router.get(
  "/",
  checkSchema(postValidationSchemas.getAllPostsSchema),
  validate,
  postController.getAllPosts
)

// Retrieve a specific post by their ID.
router.get(
  "/:id",
  checkSchema(postValidationSchemas.postByIdSchema),
  validate,
  postController.getPostById
)

// Create a new post.
router.post(
  "/",
  checkSchema(postValidationSchemas.createPostSchema),
  validate,
  postController.createPost
)

// Update post information.
router.put(
  "/:id",
  checkSchema(postValidationSchemas.updatePostByIdSchema),
  validate,
  postController.updatePostById
)

// Delete a post.
router.delete(
  "/:id",
  checkSchema(postValidationSchemas.postByIdSchema),
  validate,
  postController.deletePostById
)

export default router
