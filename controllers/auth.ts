import { Response, Request } from "express"
import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypt from "bcrypt"
import crypto from "crypto"
import { sendConfirmationEmail, sendWelcomeEmail } from "../utils/sendEmail"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const register = async(req: Request, res: Response) => {
    const {name, email, password} = req.body
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (user) {
        res.status(401).json({
        error: 'A user with this email is already registered'
      })
    }else{
        try {
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
            await sendWelcomeEmail({username: createdUser.name, email: createdUser.email})
            res.status(200).json('Created user successfuly')  
        }catch(err){
            res.status(401).json({
                error: err
            })
        }
    }
}

export const login = async(req: Request, res: Response)=>{
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
}

export const forgotPassword = async(req: Request, res: Response) => {
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
        try{
            const recoverPasswordToken = crypto.randomBytes(30).toString("hex")
            const thirtyMinutes = 1000 * 60 * 10 
            const passwordTokenExpiration = new Date(Date.now() + thirtyMinutes)
            const userWithToken = await prisma.user.update({
                where : {
                    email
                },
                data : {
                    recoverPasswordToken,
                    passwordTokenExpiration
                },
            })
            if(userWithToken.recoverPasswordToken === null){ 
                throw new Error('Unexpected null token')
            }
            await sendConfirmationEmail({email :userWithToken.email, username: userWithToken.name, recoveryToken : userWithToken.recoverPasswordToken})
            res.status(200).json("Recovery code sent")
        }catch(err){
            res.status(401).json({
                error: err
            })
        }
    }
}

export const recoverPassword =  async(req: Request, res: Response) => {
    const {email, recoverPasswordToken, password} = req.body
    const currentDate = new Date()
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    if (!user || !(recoverPasswordToken == user.recoverPasswordToken || user.passwordTokenExpiration === null)){
        res.status(401).json({
            error: 'An error occured'
        })
    }else if(user.passwordTokenExpiration && user.passwordTokenExpiration < currentDate){
        res.status(401).json({
            error: 'expired token'
        })
    }else{
        const passwordHash = await bcrypt.hash(password,10)

        await prisma.user.update({
            where : {
                email
            },
            data : {
                passwordHash,
                recoverPasswordToken : null
            },
        })
        res.status(200).json("Password changed")
    }
}
