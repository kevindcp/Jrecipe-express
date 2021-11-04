import { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req, res, next) =>{
    const { decodedToken } = req.body
    if (decodedToken.role != 'ADMIN'){
        return res.status(401).json({ error: 'Not authorized' })
    }
    next()
}