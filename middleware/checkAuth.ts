import jwt from "jsonwebtoken"
import { RequestHandler } from "express"

export const checkAuth : RequestHandler = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ' '
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  else {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  if (!token) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)
    req.body.decodedToken = decodedToken
  }catch{
      return res.status(401).json({error: 'token missing or invalid'})
  }
  next()
}