import express from "express"
import userController from "../controllers/userController"

import { checkSchema } from "express-validator"
import validate from "../middlewares/validate"

const router = express.Router()

router.get("/", userController.getAllUsers)

export default router
