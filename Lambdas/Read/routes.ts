import controllerClients from "./controllerClients"
import controllerAnimals from "./controllerAnimals"

import { Routes } from "/opt/nodejs/interface/routes"

export default (path: string, method: string): Function => {
  const routes: Routes = {
    "/clients - GET": controllerClients.get,
    "/animals - GET": controllerAnimals.get
  }
  return routes[`${path} - ${method}`]
}
