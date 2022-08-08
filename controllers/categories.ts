import { Response, Request } from "express"
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAll = async(req: Request, res: Response) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true
            }
        })
        res.status(200).json(categories)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const getCategoryRecipes = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const categories = await prisma.category.findUnique({
            where: {
                id
            },
            select: {
                recipes: true
            }
        })
        res.status(200).json(categories)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const createCategory = async(req: Request, res: Response) => {
    try {
        const { name } = req.body
        if (!name) return res.status(400).json('Invalid request')
        const category = await prisma.category.findUnique({
            where: {
                name
            }
        })
        if (category) return res.status(400).json('A category with this name already exists')
        const newCategory = await prisma.category.create({
            data: {
                name
            }
        })
        res.status(200).json(newCategory)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const updateCategory = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { name } = req.body
        const original = await prisma.category.findUnique({
            where: { 
                id
            }
        })
        // category does not exist
        if (!original) return res.status(400).json({ error: 'No such category' })
        const updated = await prisma.category.update({
            where: {
                id
            },
            data: {
                name
            }
        })
        res.status(200).json(updated)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const deleteCategory = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const original = await prisma.category.findUnique({
            where: { 
                id
            }
        })
        // category does not exist
        if (!original) return res.status(400).json({ error: 'No such category' })
        await prisma.category.delete({
            where: {
                id
            }
        })
        res.status(200).json("success")
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}