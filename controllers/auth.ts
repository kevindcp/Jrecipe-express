import { Response, Request } from "express"
import { PrismaClient} from '@prisma/client'
import * as bcrypt from "bcrypt"
import crypto from "crypto"
import { sendConfirmationEmail } from "../utils/sendEmail"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const register = async(req: Request, res: Response) => {
    try {
        const {name, email, password} = req.body
        if (!name||!email||!password) return res.status(400).json('Invalid request')
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (user) return res.status(400).json('A user with this email is already registered')
        const passwordHash = await bcrypt.hash(password, 10)
        const role = await prisma.user.count() === 0 ? 'ADMIN' : 'USER'
        await prisma.user.create({ 
            data: {
                name, 
                email,
                role,
                passwordHash,
                }
        })
        res.status(200).json('Created user successfuly')  
    } catch(err){
        res.status(400).json({
            error: err
        })
    }
}

export const login = async(req: Request, res: Response)=>{
    try{
        const {email, password} = req.body
        const user = await prisma.user.findUnique({
            where : {
                email
            },
        })
        const passwordIsCorrect = user === null ? false: await bcrypt.compare(password, user.passwordHash)
        if (!user || !passwordIsCorrect) return res.status(400).json('Invalid user or password')
        const tokenContent = {
            id: user.id,
            role: user.role,
        }
        const jwtToken = jwt.sign(tokenContent, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRATION_TIME
        })
        res.status(200).json(jwtToken)
    } catch(err){
        res.status(400).json({
            error: err
        })
    }
}

export const forgotPassword = async(req: Request, res: Response) => {
    try{
        const {email} = req.body
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) return res.status(400).json('invalid user or password')
        const recoverPasswordToken = crypto.randomBytes(6).toString("hex")
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
            return res.status(400).json('Unexpected null token')
        }
        await sendConfirmationEmail({email :userWithToken.email, username: userWithToken.name, recoveryToken : userWithToken.recoverPasswordToken})
        res.status(200).json("Recovery code sent")
    } catch(err){
        res.status(400).json({
            error: err
        })
    }
}

export const recoverPassword =  async(req: Request, res: Response) => {
    try{
        const {email, recoverPasswordToken, newPassword} = req.body
        const currentDate = new Date()
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (newPassword.length < 6) return res.status(400).json('Password is too short')
        if (!user || !(recoverPasswordToken == user.recoverPasswordToken || user.passwordTokenExpiration === null)) return res.status(400).json('An error occured')
        if (user.passwordTokenExpiration && user.passwordTokenExpiration < currentDate) return res.status(401).json('Expired token')
        const passwordHash = await bcrypt.hash(newPassword,10)
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
    } catch(err){
        res.status(400).json({
            error: err
        })
    }
}

export const changePasswordManual =  async(req: Request, res: Response) => {
    try{
        const {email, password} = req.body
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })
        if (!user) return res.status(400).json('Not a valid user')
        if (password.length < 6) return res.status(400).json('Password is too short')
        const passwordHash = await bcrypt.hash(password,10)
        await prisma.user.update({
            where : {
                email
            },
            data : {
                passwordHash,
            },
        })
        res.status(200).json("Password changed")
    } catch(err){
        res.status(400).json({
            error: err
        })
    }
}