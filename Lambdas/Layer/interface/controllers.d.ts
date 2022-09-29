import { APIGatewayProxyEventQueryStringParameters } from "aws-lambda"

export interface IBodyClients {
  name: string
  cpf: string
  phone: string
}

export interface IQueryClients
  extends APIGatewayProxyEventQueryStringParameters {
  name: string
  cpf: string
}

export interface IBodyAnimals {
  name: string
  breed: string
  age: number
  client: {
    connect: {
      id: number
    }
  }
}

export interface IQueryAnimals
  extends APIGatewayProxyEventQueryStringParameters {
  id: number
}
