import express from "express"
import { getAll } from "../controllers/recipes"


const recipeRouter = express.Router()

recipeRouter.get('/', getAll)

export default recipeRouter