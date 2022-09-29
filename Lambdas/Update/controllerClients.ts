import { APIGatewayProxyEvent } from "aws-lambda"
import senseLogs from "senselogs"

import messages from "/opt/nodejs/messages/messages"
import { IUpdate } from "/opt/nodejs/interface/controllers"
import controllerDynamoDB from "/opt/nodejs/aws/db/DB"
import conditions from "/opt/nodejs/aws/db/conditions/conditions"

const log = new senseLogs()

const controller = {
  update: async (event: APIGatewayProxyEvent) => {
    if (!event.body) return messages.errorNotBody()
    const { id, name } = JSON.parse(event.body) as IUpdate
    try {
      await controllerDynamoDB.update(
        "Audio",
        conditions.equal({
          filter: "id",
          eq: id
        }),
        { name }
      )
      return messages.success("Ok!")
    } catch (error: any) {
      log.error(error)
      return messages.errorDefault(error)
    }
  }
}

export default controller
