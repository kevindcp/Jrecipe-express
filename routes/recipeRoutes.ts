import express from "express"
import { deleteRecipe, getAll, getRecipe, postRecipe, updateRecipe } from "../controllers/recipes"
import { checkAuth } from "../middleware/checkAuth"


const recipeRouter = express.Router()

recipeRouter.get('/', getAll)

recipeRouter.get('/:id', getRecipe)

recipeRouter.post('/', checkAuth, postRecipe)

recipeRouter.patch('/:id', checkAuth, updateRecipe)

recipeRouter.delete('/:id', checkAuth, deleteRecipe)

export default recipeRouter