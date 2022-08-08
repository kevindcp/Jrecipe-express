import express from "express"
import { deleteUser, getAll, getMe, getMeRecipes, getMeRecipesAll, getUser, getUserProfile, getUserRecipes, getUserRecipesByCategory, updateUser, updateUserProfile } from "../controllers/users"
import { checkAuth } from "../middleware/checkAuth"
import { isAdmin } from "../middleware/isAdmin"

const userRouter = express.Router()

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     tags:
 *       - users
 *     description: Gets all the users (admin only)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     responses:
 *       200:
 *         description: Returns all users on db
 */
userRouter.get('/', checkAuth, isAdmin, getAll)


/**
 * @swagger
 * /api/v1/users/me/:
 *   get:
 *     tags:
 *       - users
 *     description: Gets data from the current user
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     responses:
 *       200:
 *         description: Returns the user data
 */
 userRouter.get('/me', checkAuth, getMe)

/**
 * @swagger
 * /api/v1/users/me/recipes/:cursor/:prev:
 *   get:
 *     tags:
 *       - users
 *     description: Gets a page of recipes from the current user
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     responses:
 *       200:
 *         description: Returns the user data
 */
 userRouter.get('/me/recipes/', checkAuth, getMeRecipesAll) 

/**
 * @swagger
 * /api/v1/users/me/recipes/:cursor/:prev:
 *   get:
 *     tags:
 *       - users
 *     description: Gets a page of recipes from the current user
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: cursor
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the last recipe retrieved
 *       - in: path
 *         name: prev
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric value that determines the mode (get previous page = 0 else get next page )
 *     responses:
 *       200:
 *         description: Returns the user data
 */
 userRouter.get('/me/recipes/:cursor/:prev', checkAuth, getMeRecipes) 

/**
 * @swagger
 * /api/v1/users/{userId}/:
 *   get:
 *     tags:
 *       - users
 *     description: Gets the user with matching id (admin only)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: Returns the user with a matching id
 */
userRouter.get('/:id', checkAuth, isAdmin, getUser)

/**
 * @swagger
 * /api/v1/users/{userId}/recipes/:cursor:
 *   get:
 *     tags:
 *       - users
 *     description: Gets a page the recipes from the user with matching id
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *       - in: path
 *         name: cursor
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the last recipe of the page
 *     responses:
 *       200:
 *         description: Returns a page of recipes for the user with a matching id
 */
userRouter.get('/:id/recipes/:cursor', checkAuth, getUserRecipes)

/**
 * @swagger
 * /api/v1/users/{userId}/profile/:
 *   get:
 *     tags:
 *       - users
 *     description: Gets the profile from the user with matching id
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: Returns the profile from the user with a matching id
 */
userRouter.get('/:id/profile', checkAuth, getUserProfile)

/**
 * @swagger
 * /api/v1/users/{userId}/recipes/categories/{categoryId}/:
 *   get:
 *     tags:
 *       - users
 *     description: Gets the recipes from the user with matching id that match the category id
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category
 *     responses:
 *       200:
 *         description: Returns the recipes from the user with a matching id that match the category id
 */
userRouter.get('/:id/recipes/categories/:catId', checkAuth, getUserRecipesByCategory)

/**
 * @swagger
 * /api/v1/users/{userId}/:
 *   patch:
 *     tags:
 *       - users
 *     description: Update the user with matching id (owner and admin only)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     produces: application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: false
 *         type: string
 *       - name: name
 *         in: formData
 *         required: false
 *         type: string
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: Returns upodated user
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
userRouter.patch('/:id', checkAuth, updateUser)

/**
 * @swagger
 * /api/v1/users/{userId}/profile/:
 *   patch:
 *     tags:
 *       - users
 *     description: Update the users with the matching id profile (owner and admin only)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     produces: application/json
 *     parameters:
 *       - name: bio
 *         in: formData
 *         required: false
 *         type: string
 *       - name: picture
 *         in: formData
 *         required: false
 *         type: file
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: Returns upodated user
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
userRouter.patch('/:id/profile', checkAuth, updateUserProfile)

/**
 * @swagger
 * /api/v1/users/{userId}/:
 *   delete:
 *     tags:
 *       - users
 *     description: Delete a user with the matching id (only admin)
 *     security:
 *       - BearerAuth:
 *           type: http
 *           scheme: bearer
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Returns success message
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
userRouter.delete('/:id', checkAuth, isAdmin, deleteUser)

export default userRouter