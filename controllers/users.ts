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
                recipes: true,
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
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select : {
                id: true,
                email : true,
                name: true, 
                role: true,
                recipes: true,
            }
        })
        res.status(200).json(user)
    } catch (err) { 
        res.status(400).json({
            error: err
        })
    }
}

export const getUserRecipes = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const userRecipes = await prisma.user.findUnique({
            where: {
                id
            },
            select : {
                recipes: true
            }
        })
        res.status(200).json(userRecipes)
    } catch (err) { 
        res.status(400).json({
            error: err
        })
    }
}

export const getUserRecipesByCategory = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const categoryId = parseInt(req.params.catId)
        const userRecipes = await prisma.user.findUnique({
            where: {
                id
            },
            select : {
                recipes: {
                    where: {
                        categoryId
                    }
                }
            }
        })
        res.status(200).json(userRecipes)
    } catch (err) { 
        res.status(400).json({
            error: err
        })
    }
}

export const getUserProfile = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const userRecipes = await prisma.user.findUnique({
            where: {
                id
            },
            select : {
                profile: true
            }
        })
        res.status(200).json(userRecipes)
    } catch (err) { 
        res.status(400).json({
            error: err
        })
    }
}

export const updateUser = async(req: Request, res: Response) => {
    try { 
        const id = parseInt(req.params.id)
        const {email, name, role, decodedToken} = req.body
        const ownerId = decodedToken.id 
        // Only admin and owner can update it
        if (id != ownerId && decodedToken.role != 'ADMIN') return res.status(401).json({ error: 'Not authorized' })
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

export const updateUserProfile = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { bio, picture, decodedToken } = req.body
        const ownerId = decodedToken.id 
        // Only admin and owner can update it
        if (id != ownerId && decodedToken.role != 'ADMIN') return res.status(401).json({ error: 'Not authorized' })
        const original = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!original) return res.status(400).json('User id not valid')
        await prisma.profile.update({
            where: {
                userId: id
            },
            data : {
                bio,
                picture,
            }
        })
        res.status(200).json('Success')
    } catch (err) { 
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
