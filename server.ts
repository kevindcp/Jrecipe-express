import * as dotenv from "dotenv"
import express from "express"
import router from "./routes"
import authRouter from './controllers/auth'

dotenv.config({ path: __dirname+'/.env'})
const app = express()
app.use(express.json())

app.get('/', async(req, res) => {
    res.send('<h1> Hello World </h1>')
  })

app.use('/api/v1/auth', authRouter)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
