import express from "express"
import { register, login, forgotPassword,recoverPassword, changePasswordManual } from "../controllers/auth"
import { checkAuth } from "../middleware/checkAuth"
import { isAdmin } from "../middleware/isAdmin"

const authRouter = express.Router()

/**
 * @swagger
 * /api/v1/auth/register/:
 *   post:
 *     tags:
 *       - auth
 *     description: Register a user
 *     produces: application/json
 *     parameters:
 *       - name: name
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns success message
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
authRouter.post('/register', register)

/**
 * @swagger
 * /api/v1/auth/login/:
 *   post:
 *     tags:
 *       - auth
 *     description: Login
 *     produces: application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns a jwt token
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
authRouter.post('/login', login)

/**
 * @swagger
 * /api/v1/auth/forgotPassword/:
 *   post:
 *     tags:
 *       - auth
 *     description: Password recovery first step
 *     produces: application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns success message
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
authRouter.post('/forgotPassword', forgotPassword)

/**
 * @swagger
 * /api/v1/auth/recoverPassword/:
 *   post:
 *     tags:
 *       - auth
 *     description: Password recovery first step
 *     produces: application/json
 *     parameters:
 *       - name: email
 *         in: formData
 *         required: true
 *         type: string
 *       - name: recoverPasswordToken
 *         in: formData
 *         required: true
 *         type: string
 *       - name: newPassword
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Returns success message
 *       400: 
 *         description: Error information
 *       401: 
 *         description: Authentication error
 */
authRouter.post('/recoverPassword', recoverPassword)

authRouter.post('/admin/changepass', checkAuth, isAdmin, changePasswordManual)

export default authRouter