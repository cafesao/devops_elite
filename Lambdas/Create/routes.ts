import controllerClients from "./controllerClients"
import controllerAnimals from "./controllerAnimals"

import { Routes } from "/opt/nodejs/interface/routes"

export default (path: string, method: string): Function => {
  const routes: Routes = {
    "/clients - POST": controllerClients.add,
    "/animals - POST": controllerAnimals.add
  }
  return routes[`${path} - ${method}`]
}
