import express from "express"
import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypt from "bcrypt"
import crypto from "crypto"
import { transporter } from "../utils/sendEmail"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const authRouter = express.Router()

authRouter.post('/register', async(req, res) => {
    const {name, email, password} = req.body
    const emailExist = await prisma.user.findUnique({
        where: {
            email
        }
    }) == null ? true : false
    if (!emailExist) {
        res.status(401).json({
        error: 'A user with this email is already registered'
      })
    }else{
        const passwordHash = await bcrypt.hash(password, 10)
        const role = await prisma.user.count() === 0 ? 'ADMIN' : 'USER'
        const createdUser = await prisma.user.create({ 
            data: {
                name, 
                email,
                role,
                passwordHash,
            }
        })
        const newUser = ({
            id: createdUser.id,
            name : createdUser.name,
            email : createdUser.email,
            role: createdUser.role,
        })
        await transporter.sendMail({
            to: newUser.email,
            subject: 'Welcome to Jrecipe',
            html: `<h4> Hello, ${newUser.name}</h4>
            Welcome to Jrecipe
            `,
        })
        res.status(200).json(newUser)
    }
});

authRouter.post('/login', async(req, res)=>{
    const {email, password} = req.body
    const user = await prisma.user.findUnique({
        where : {
            email
        },
    })
    const passwordIsCorrect = user === null ? false: await bcrypt.compare(password, user.passwordHash)
    if (!user || !passwordIsCorrect) {
        res.status(401).json({
          error: 'invalid user or password'
        })
    } else {
        const tokenContent = {
            id: user.id,
            role: user.role,
        }
        const jwtToken = jwt.sign(tokenContent, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRATION_TIME
          })
          res.status(200).json(jwtToken)
    }
});

authRouter.post('/forgot', async(req,res) => {
    const {email} = req.body
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user){
        res.status(401).json({
            error: 'invalid user or password'
          })
    }else{
        const recoverPasswordToken = crypto.randomBytes(30).toString("hex")
        const userWithToken = await prisma.user.update({
            where : {
                email
            },
            data : {
                recoverPasswordToken
            },
        })
        await transporter.sendMail({
            to: userWithToken.email,
            subject: 'Password recovery',
            html: `<h4> Hello, ${userWithToken.name}</h4>
            This is your password recovery code ${userWithToken.recoverPasswordToken}
            `,
        })
        res.status(200).json(userWithToken)
    }
})

export default authRouter