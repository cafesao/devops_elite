import { APIGatewayProxyEvent } from "aws-lambda"
import senseLogs from "senselogs"

import messages from "/opt/nodejs/messages/messages"
import { IDelete } from "/opt/nodejs/interface/controllers"
import controllerS3 from "/opt/nodejs/aws/s3/s3"
import controllerDynamoDB from "/opt/nodejs/aws/db/DB"

const log = new senseLogs()

const controller = {
  delete: async (event: APIGatewayProxyEvent) => {
    try {
      if (!event.body) return messages.errorNotBody()
      const { id } = JSON.parse(event.body) as IDelete
      await controllerS3.delete(id)
      await controllerDynamoDB.delete("Audio", { id })
      return messages.success("Ok!")
    } catch (error: any) {
      log.error(error)
      return messages.errorDefault(error)
    }
  }
}

export default controller
