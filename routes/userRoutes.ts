import express from "express"
import { getAll } from "../controllers/users"
import { decodeToken } from "../middleware/decodeToken"
import { isAdmin } from "../middleware/isAdmin"

const userRouter = express.Router()

userRouter.get('/', decodeToken, isAdmin, getAll)

export default userRouter