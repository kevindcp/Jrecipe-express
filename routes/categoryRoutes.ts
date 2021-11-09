import express from "express"
import { createCategory, deleteCategory, getAll, getCategoryRecipes, updateCategory } from "../controllers/categories"
import { checkAuth } from "../middleware/checkAuth"
import { isAdmin } from "../middleware/isAdmin"

const categoryRouter = express.Router()

categoryRouter.get('/', checkAuth, getAll)

categoryRouter.get('/:id/recipes', checkAuth, getCategoryRecipes)

categoryRouter.post('/', checkAuth, isAdmin, createCategory)

categoryRouter.patch('/:id', checkAuth, isAdmin, updateCategory)

categoryRouter.delete('/:id', checkAuth, isAdmin, deleteCategory)

export default categoryRouter