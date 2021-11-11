import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import authRouter from './routes/authRoutes'
import categoryRouter from "./routes/categoryRoutes"
import recipeRouter from "./routes/recipeRoutes"
import userRouter from "./routes/userRoutes"
import * as swaggerUi from "swagger-ui-express"

dotenv.config({ path: __dirname+'/.env'})
const app = express()
app.use(express.json())
app.use(helmet())

const swaggerJsdoc = require("swagger-jsdoc")

const PORT = process.env.PORT

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Jrecipe api",
      version: "1.0.0",
      description:
        "Simple API for the Jrecipe app developed with express, typescript and documented with Swagger",
      license: {
        name: "GPLv3",
        url: "https://www.gnu.org/licenses/gpl-3.0.en.html",
      },
      contact: {
        name: "Kevin Chacon",
        email: "kevindchaconp@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/jrecipe/`,
      },
    ],
  },
  apis: ["./routes/*Routes.ts"],
};

const specs = swaggerJsdoc(options);

app.use(
  "/api/v1/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true})
);

app.use('/api/v1/auth', authRouter)

app.use('/api/v1/users', userRouter)

app.use('/api/v1/recipes', recipeRouter)

app.use('/api/v1/categories', categoryRouter)

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`)
})
