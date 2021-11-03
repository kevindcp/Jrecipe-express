import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import authRouter from './routes/authRoutes'

dotenv.config({ path: __dirname+'/.env'})
const app = express()
app.use(express.json())
app.use(helmet())

app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
