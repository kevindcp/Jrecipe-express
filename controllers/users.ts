import { Response, Request } from "express"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const getAll = async (req : Request, res : Response) => {
    try {
        const users = await prisma.user.findMany({
            select : {
                id: true,
                email : true,
                name: true, 
                role: true,
                recipes: true
            }
        })
        res.status(200).json(users)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const getUser = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { decodedToken } = req.body
        // only admin can access all user, others can only access themselves
        if (decodedToken.role != 'ADMIN' && parseInt(decodedToken.id) != id)  return res.status(401).json({ error: 'Not authorized' })
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select : {
                id: true,
                email : true,
                name: true, 
                role: true,
                recipes: true
            }
        })
        res.status(200).json(user)
    } catch (err) { 
        res.status(400).json({
            error: err
        })
    }
}

export const updateUser = async(req: Request, res: Response) => {
    try { 
        const id = parseInt(req.params.id)
        const {email, name, role} = req.body
        const original = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!original) return res.status(400).json('User id not valid')
        await prisma.user.update({
            where : {
                id
            },
            data: {
                email,
                name,
                role,
            }
        })
        res.status(200).json("Update sucessful")
    } catch(err) {
        res.status(400).json({
            error: err
        })
    }
}

export const deleteUser = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        if (id == 1) return res.status(400).json('Cant delete admin')
        await prisma.user.delete({
            where: {
                id
            }
        })
        res.status(200).json("Deletion successful")
    } catch(err) { 
        res.status(400).json({
            error: err
        })
    }
}
