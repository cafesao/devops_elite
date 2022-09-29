import { APIGatewayProxyEvent } from "aws-lambda"
import senseLogs from "senselogs"

import messages from "/opt/nodejs/messages/messages"
import { ICreate } from "/opt/nodejs/interface/controllers"
import controllerS3 from "/opt/nodejs/aws/s3/s3"
import controllerDynamoDB from "/opt/nodejs/aws/db/DB"
import generateId from "/opt/nodejs/helpers/generateId"

const log = new senseLogs()

const controller = {
  add: async (event: APIGatewayProxyEvent) => {
    if (!event.body) return messages.errorNotBody()
    const { data, name, type } = JSON.parse(event.body) as ICreate
    try {
      const id = generateId()
      await controllerS3.add(data, id, type)
      await controllerDynamoDB.create("Audio", { id, name })
      return messages.success({ id })
    } catch (error: any) {
      log.error(error)
      return messages.errorDefault(error)
    }
  }
}

export default controller
