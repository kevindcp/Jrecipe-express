import express from "express"
import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypt from "bcrypt"
const prisma = new PrismaClient()
const router = express.Router()


router.get('/',async (req, res) => {
    res.send('<h1> API </h1>')
})

router.post('/register', async(req, res) => {
    const {name, email, password} = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const createdUser = await prisma.user.create({ 
        data: {
            name, 
            email,
            passwordHash,
        }
    })
    const newUser = ({
        id: createdUser.id,
        name : createdUser.name,
        email : createdUser.email,
        role: createdUser.role,
    })
    res.json(newUser)
})

export default router