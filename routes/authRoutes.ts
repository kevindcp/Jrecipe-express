import express from "express"
import { register, login, forgotPassword,recoverPassword } from "../controllers/auth"

const authRouter = express.Router()

authRouter.post('/register', register)

authRouter.post('/login', login)

authRouter.post('/forgot', forgotPassword)

authRouter.post('/recovery', recoverPassword)

export default authRouter