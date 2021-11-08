import { Response, Request } from "express"
import { PrismaClient, Prisma } from '@prisma/client'

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
