import express from "express"
import userRouter from "../controllers/auth"
const router = express.Router()

router.get('/',async (req, res) => {
    res.send('<h1> API </h1>')
})

router.use('/auth/', userRouter)

export default router