import { Response, Request } from "express"
import { PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const getAll = async(req: Request, res: Response) => {
    try { 
        const recipes = await prisma.recipe.findMany()
        res.status(200).json(recipes)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}


export const getRecipe = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const recipe = await prisma.recipe.findUnique({
            where: { 
                id
            }
        })
        res.status(200).json(recipe)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const postRecipe = async(req: Request, res: Response) => {
    try {
        const { title, ingredients, steps, decodedToken, category, prepTime, cookTime, image} = req.body
        if (!title||!cookTime||!prepTime) return res.status(400).json('Invalid request')
        const authorId = decodedToken.id
        const categoryName = await prisma.category.findUnique({
            where: {
                id: parseInt(category)
            }
        })
        if (!categoryName) return res.status(400).json('Not a valid Category')
        const recipe = await prisma.recipe.create({
            data: {
                title,
                ingredients,
                steps,
                authorId,
                prepTime,
                cookTime,
                image,
                categoryId : parseInt(category)
            }
        })
        res.status(200).json(recipe)
    
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const updateRecipe = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { title, ingredients, steps, category, prepTime, cookTime, image, decodedToken } = req.body
        const authorId = decodedToken.id 
        const original = await prisma.recipe.findUnique({ 
            where: { 
                id
            }
        })
        // Recipe does not exist
        if (!original) return res.status(400).json({ error: 'No such recipe' })
        // Only admin and creator of a recipe can update it
        if (original.authorId != authorId && decodedToken.role != 'ADMIN') return res.status(401).json({ error: 'Not authorized' })
        const newRecipe = await prisma.recipe.update({
            where: {
                id
            },
            data: {
                title,
                ingredients,
                steps,
                categoryId: parseInt(category),
                prepTime,
                cookTime,
                image,
            }
        })
        res.status(200).json(newRecipe)
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}

export const deleteRecipe = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)
        const { decodedToken } = req.body
        const authorId = decodedToken.id 
        const original = await prisma.recipe.findUnique({ 
            where: { 
                id
            }
        })
        // Recipe does not exist
        if (!original) return res.status(400).json({ error: 'No such recipe' })
        // Only admin and creator of a recipe can delete it
        if (original.authorId != authorId && decodedToken.role != 'ADMIN') return res.status(401).json({ error: 'Not authorized' })
        await prisma.recipe.delete({
            where: {
                id
            }
        })
        res.status(200).json("Success")
    } catch (err) {
        res.status(400).json({
            error: err
        })
    }
}