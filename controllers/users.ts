import { Response, Request } from "express"
import { PrismaClient} from '@prisma/client'

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
        const cursor = parseInt(req.params.cursor)
        if (cursor === 0) {
            const userRecipes = await prisma.recipe.findMany({
                take: 8,
                where: {
                    authorId:id
                },
                orderBy : {
                    id: 'asc'
                }
            })
            res.status(200).json(userRecipes) 
        } else {
            const userRecipes = await prisma.recipe.findMany({
                take: 8,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    authorId:id
                },
                orderBy : {
                    id: 'asc'
                }
            })
            res.status(200).json(userRecipes) 
        }
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

export const getMe = async(req: Request, res: Response) => {
    try {
        const { decodedToken } = req.body
        const id = decodedToken.id
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            select : {
                id: true,
                email : true,
                name: true, 
                role: true,
            }
        })
        res.status(200).json(user)
    } catch (err) { 
        res.status(400).json({
            error: err
        })
    }
}

export const getMeRecipes = async(req: Request, res: Response) => {
    try {
        const { decodedToken } = req.body
        const id = decodedToken.id
        const cursor = parseInt(req.params.cursor)
        const prev = parseInt(req.params.prev)
        if (cursor === 0) {
            const userRecipes = await prisma.recipe.findMany({
                take: 8,
                where: {
                    authorId:id
                },
                orderBy : {
                    id: 'asc'
                }
            })
            res.status(200).json(userRecipes) 
        } else {
            const userRecipes = await prisma.recipe.findMany({
                take: prev ? -8 : 8,
                skip: 1,
                cursor: {
                    id: cursor
                },
                where: {
                    authorId:id
                },
                orderBy : {
                    id: 'asc'
                }
            })
            res.status(200).json(userRecipes) 
        }
    } catch (err) { 
        res.status(400).json({
            error: err
        })
    }
}

export const getMeRecipesAll = async(req: Request, res: Response) => {
    try {
        const { decodedToken } = req.body
        const id = decodedToken.id
        const userRecipes = await prisma.recipe.findMany({
            where: {
                authorId:id
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
        const {email, name, decodedToken} = req.body
        const ownerId = decodedToken.id 
        // Only admin and owner can update it
        if (id != ownerId && decodedToken.role != 'ADMIN') return res.status(401).json({ error: 'Not authorized' })
        const original = await prisma.user.findUnique({
            where: {
                id
            }
        })
        if (!original) return res.status(400).json('User id not valid')
        const updated = await prisma.user.update({
            where : {
                id
            },
            data: {
                email,
                name,
            }
        })
        res.status(200).json(updated)
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
