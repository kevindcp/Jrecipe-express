import express from "express"
import { deleteUser, getAll, getSelf, getUser, updateUser } from "../controllers/users"
import { decodeToken } from "../middleware/decodeToken"
import { isAdmin } from "../middleware/isAdmin"

const userRouter = express.Router()

userRouter.get('/', decodeToken, isAdmin, getAll)

userRouter.get('/me', decodeToken, getSelf)

userRouter.get('/:id', decodeToken, isAdmin, getUser)

userRouter.patch('/:id', decodeToken, isAdmin, updateUser)

userRouter.delete('/:id', decodeToken, isAdmin, deleteUser)

export default userRouter