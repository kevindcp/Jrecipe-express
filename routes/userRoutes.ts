import express from "express"
import { deleteUser, getAll, getUser, getUserProfile, getUserRecipes, getUserRecipesByCategory, updateUser, updateUserProfile } from "../controllers/users"
import { checkAuth } from "../middleware/checkAuth"
import { isAdmin } from "../middleware/isAdmin"

const userRouter = express.Router()

userRouter.get('/', checkAuth, isAdmin, getAll)

userRouter.get('/:id', checkAuth, isAdmin, getUser)

userRouter.get('/:id/recipes', checkAuth, getUserRecipes)

userRouter.get('/:id/profile', checkAuth, getUserProfile)

userRouter.get('/:id/recipes/categories/:catId', checkAuth, getUserRecipesByCategory)

userRouter.patch('/:id', checkAuth, updateUser)

userRouter.patch('/:id/profile', checkAuth, updateUserProfile)

userRouter.delete('/:id', checkAuth, isAdmin, deleteUser)

export default userRouter