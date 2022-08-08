import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import authRouter from './routes/authRoutes'
import categoryRouter from "./routes/categoryRoutes"
import recipeRouter from "./routes/recipeRoutes"
import userRouter from "./routes/userRoutes"
import * as swaggerUi from "swagger-ui-express"
import swaggerOptions from "./utils/swaggerConfig"
import cors from "cors"

dotenv.config({ path: __dirname+'/.env'})
const app = express()
app.use(express.json())
app.use(helmet.contentSecurityPolicy({
  useDefaults: true,
  directives: {
    "img-src": ["'self'", "https: data:"]
  }
}))
app.use(cors())

const PORT = process.env.PORT

const swaggerJsdoc = require("swagger-jsdoc")

const specs = swaggerJsdoc(swaggerOptions);

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true})
);

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/users', userRouter)

app.use('/api/v1/recipes', recipeRouter)

app.use('/api/v1/categories', categoryRouter)

app.use(express.static('../front/dist'))

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
