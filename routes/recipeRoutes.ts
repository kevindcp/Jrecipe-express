import express from "express"
import { deleteRecipe, getAll, getRecipe, postRecipe, updateRecipe } from "../controllers/recipes"
import { checkAuth } from "../middleware/checkAuth"
import { isAdmin } from "../middleware/isAdmin"

const recipeRouter = express.Router()

/**
 * @swagger
 * /api/v1/recipes/:
 *   get:
 *     tags:
 *       - recipes
 *     description: Gets all the recipes 
 *     responses:
 *       200:
 *         description: Returns all recipes on db
 */
recipeRouter.get('/', getAll)

/**
 * @swagger
 * /api/v1/recipes/{recipeId}/:
 *   get:
 *     tags:
 *       - recipes
 *     description: Gets the recipe with matching id
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the recipe
 *     responses:
 *       200:
 *         description: Returns the recipe with a matching id
 */
recipeRouter.get('/:id', getRecipe)

/**
 * @swagger
 * /api/v1/recipes/:
 *   post:
 *     tags:
 *       - recipes
 *     description: Publish a recipe
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     produces: application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: true
 *         type: string
 *       - name: ingredients
 *         in: formData
 *         required: true
 *         type: string
 *       - name: steps
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         in: formData
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Returns published recipe
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
recipeRouter.post('/', checkAuth, postRecipe)

/**
 * @swagger
 * /api/v1/recipes/{recipeId}/:
 *   patch:
 *     tags:
 *       - recipes
 *     description: Update the recipe with the matching id (only owner and admin)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     produces: application/json
 *     parameters:
 *       - name: title
 *         in: formData
 *         required: false
 *         type: string
 *       - name: ingredients
 *         in: formData
 *         required: false
 *         type: string
 *       - name: steps
 *         in: formData
 *         required: false
 *         type: string
 *       - name: category
 *         in: formData
 *         required: false
 *         type: integer
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the recipe
 *     responses:
 *       200:
 *         description: Returns upodated recipe
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
recipeRouter.patch('/:id', checkAuth, updateRecipe)

/**
 * @swagger
 * /api/v1/recipes/{recipeId}/:
 *   delete:
 *     tags:
 *       - recipes
 *     description: Delete the recipe with the matching id (only owner and admin)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the recipe
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns success message
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
recipeRouter.delete('/:id', checkAuth, deleteRecipe)

export default recipeRouter