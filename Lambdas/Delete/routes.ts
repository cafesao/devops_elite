import controllerClients from "./controllerClients"
import controllerAnimals from "./controllerAnimals"

import { Routes } from "/opt/nodejs/interface/routes"

export default (path: string, method: string): Function => {
  const routes: Routes = {
    "/clients - DELETE": controllerClients.delete,
    "/animals - DELETE": controllerAnimals.delete
  }
  return routes[`${path} - ${method}`]
}
