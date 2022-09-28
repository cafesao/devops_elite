import dotenv from "dotenv"
import express from "express"
import cors from "cors"

import routesClients from "./routes/routesClients"
import routesAnimals from "./routes/routesAnimals"

dotenv.config()

const portApi = process.env.API_PORT
const api = express()

api.use(express.json())
api.use(cors())

api.use("/api/clients", routesClients)
api.use("/api/animals", routesAnimals)

api.use("/api", async (_, res) => res.sendStatus(200))

api.listen(portApi, () => console.log(`Server start port ${portApi}`))
