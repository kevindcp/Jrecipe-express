import express from "express"
import { deleteUser, getAll, getUser, updateUser } from "../controllers/users"
import { decodeToken } from "../middleware/decodeToken"
import { isAdmin } from "../middleware/isAdmin"

const userRouter = express.Router()

userRouter.get('/', decodeToken, isAdmin, getAll)

userRouter.get('/:id', decodeToken, getUser)

userRouter.patch('/:id', decodeToken, isAdmin, updateUser)

userRouter.delete('/:id', decodeToken, isAdmin, deleteUser)

export default userRouter