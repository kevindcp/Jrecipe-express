import { Response, Request } from "express"
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

export const getAll = async (req : Request, res : Response) => {
    const users = await prisma.user.findMany()
    res.json(users)
}