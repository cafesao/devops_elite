import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import routes from "./routes"

export const handler: APIGatewayProxyHandler = async (
  event,
  _,
  callback
): Promise<any> => {
  const controller = routes(event.path, event.httpMethod)
  const response: APIGatewayProxyResult = await controller(event)
  callback(null, response)
}
