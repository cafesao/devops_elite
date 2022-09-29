import controllerClients from "./controllerClients"
import controllerAnimals from "./controllerAnimals"

import { Routes } from "/opt/nodejs/interface/routes"

export default (path: string, method: string): Function => {
  const routes: Routes = {
    "/clients - PATCH": controllerClients.update,
    "/animals - PATCH": controllerAnimals.update
  }
  return routes[`${path} - ${method}`]
}
