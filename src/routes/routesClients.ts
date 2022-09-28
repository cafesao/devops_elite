import { Router } from "express"
import controller from "../controller/controllerClients"

const routes = Router()

routes.get("/", controller.read)
routes.post("/", controller.create)
routes.patch("/", controller.update)
routes.delete("/", controller.delete)

export default routes
