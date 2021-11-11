import express from "express"
import { createCategory, deleteCategory, getAll, getCategoryRecipes, updateCategory } from "../controllers/categories"
import { checkAuth } from "../middleware/checkAuth"
import { isAdmin } from "../middleware/isAdmin"

const categoryRouter = express.Router()

/**
 * @swagger
 * /api/v1/categories/:
 *   get:
 *     tags:
 *       - categories
 *     description: Gets all the categories
 *     responses:
 *       200:
 *         description: Returns all categories on db
 */
categoryRouter.get('/', getAll)

/**
 * @swagger
 * /api/v1/categories/{categoryId}/recipes/:
 *   get:
 *     tags:
 *       - categories
 *     description: Gets the recipes from the category with matching id
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category
 *     responses:
 *       200:
 *         description: Returns the recipes from the category with a matching id
 */
categoryRouter.get('/:id/recipes', checkAuth, getCategoryRecipes)

/**
 * @swagger
 * /api/v1/categories/:
 *   post:
 *     tags:
 *       - categories
 *     description: Create a category {admin only}
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     produces: application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns created category
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
categoryRouter.post('/', checkAuth, isAdmin, createCategory)

/**
 * @swagger
 * /api/v1/categories/{categoryId}/:
 *   patch:
 *     tags:
 *       - categories
 *     description: Update the category with matching id (admin only)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     produces: application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: false
 *         type: string
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category
 *     responses:
 *       200:
 *         description: Returns upodated category
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
categoryRouter.patch('/:id', checkAuth, isAdmin, updateCategory)

/**
 * @swagger
 * /api/v1/categories/{categoryId}/:
 *   delete:
 *     tags:
 *       - categories
 *     description: Delete a category with the matching id (only admin)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns success message
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
categoryRouter.delete('/:id', checkAuth, isAdmin, deleteCategory)

export default categoryRouter