import { APIGatewayProxyEvent } from "aws-lambda"
import senseLogs from "senselogs"

import messages from "/opt/nodejs/messages/messages"
import { IRead } from "/opt/nodejs/interface/controllers"
import controllerS3 from "/opt/nodejs/aws/s3/s3"
import controllerDynamoDB from "/opt/nodejs/aws/db/DB"

const log = new senseLogs()

const controller = {
  get: async (event: APIGatewayProxyEvent) => {
    if (!event.queryStringParameters) return messages.errorNotBody()
    const { id } = event.queryStringParameters as IRead
    try {
      const url = await controllerS3.getUrl(id)
      return messages.success({ url })
    } catch (error: any) {
      log.error(error)
      return messages.errorDefault(error)
    }
  },
  getAll: async (event: APIGatewayProxyEvent) => {
    try {
      const data = await controllerDynamoDB.getAll("Audio")
      if (!data) return messages.error(404, { error: "Not Found" })
      return messages.success(data)
    } catch (error: any) {
      log.error(error)
      return messages.errorDefault(error)
    }
  }
}

export default controller
