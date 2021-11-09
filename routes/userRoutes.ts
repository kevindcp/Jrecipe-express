import express from "express"
import { deleteUser, getAll, getUser, getUserRecipes, getUserRecipesByCategory, updateUser } from "../controllers/users"
import { checkAuth } from "../middleware/checkAuth"
import { isAdmin } from "../middleware/isAdmin"

const userRouter = express.Router()

userRouter.get('/', checkAuth, isAdmin, getAll)

userRouter.get('/:id', checkAuth, isAdmin, getUser)

userRouter.patch('/:id', checkAuth, isAdmin, updateUser)

userRouter.delete('/:id', checkAuth, isAdmin, deleteUser)

userRouter.get('/:id/recipes', checkAuth, getUserRecipes)


userRouter.get('/:id/recipes/categories/:catId', checkAuth, getUserRecipesByCategory)

export default userRouter