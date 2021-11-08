import express from "express"
import { deleteRecipe, getAll, getRecipe, postRecipe, updateRecipe } from "../controllers/recipes"
import { decodeToken } from "../middleware/decodeToken"


const recipeRouter = express.Router()

recipeRouter.get('/', getAll)

recipeRouter.get('/:id', getRecipe)

recipeRouter.post('/', decodeToken, postRecipe)

recipeRouter.patch('/:id', decodeToken, updateRecipe)

recipeRouter.delete('/:id', decodeToken, deleteRecipe)

export default recipeRouter