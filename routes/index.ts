import express from "express"
import { PrismaClient, Prisma } from '@prisma/client'
import userRouter from "../controllers/user"
const prisma = new PrismaClient()
const router = express.Router()

router.get('/',async (req, res) => {
    res.send('<h1> API </h1>')
})

router.use('/auth/', userRouter)

export default router