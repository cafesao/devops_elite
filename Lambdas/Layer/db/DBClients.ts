import connectDB from "./connect"
import modifyBody from "../helper/modifyBody"
import { IBodyClients, IQueryClients } from "../interface/controllers"
import senselogs from "senselogs"
import logs from "../logs/controllerLogs"

const controller = {
  create: async (body: IBodyClients) => {
    const context = {
      file: "DBClients",
      function: "create"
    }
    logs.infoContext(context)
    try {
      const db = await connectDB()
      const bodyModify = modifyBody.client(body)

      await db.clients.create({ data: bodyModify })
      logs.createRecordDB(context)

      return true
    } catch (error: any) {
      logs.error(error, context)
      return false
    }
  },
  read: async (query: IQueryClients) => {
    const context = {
      file: "DBClients",
      function: "read"
    }
    const { name = false, cpf = false } = query
    logs.infoContext(context)
    try {
      const db = await connectDB()
      if (cpf) {
        logs.info("Searching by cpf", context)
        const data = await db.clients.findUnique({
          where: { cpf: String(cpf) },
          include: { animals: true }
        })
        logs.dataRecordDB(context, data)
        return data
      } else if (name) {
        logs.info("Searching for name", context)
        const data = await db.clients.findUnique({
          where: { name: String(name) },
          include: { animals: true }
        })
        logs.dataRecordDB(context, data)
        return data
      } else {
        logs.info("Searching by all", context)
        const data = await db.clients.findMany()
        logs.dataRecordDB(context, data)
        return data
      }
    } catch (error) {
      logs.error(error, context)
      return false
    }
  },
  update: async (body: IBodyClients, query: IQueryClients) => {
    const context = {
      file: "DBClients",
      function: "update"
    }
    const { name = false, cpf = false } = query
    logs.infoContext(context)
    try {
      const db = await connectDB()
      if (cpf) {
        logs.info("Searching by cpf", context)
        await db.clients.update({ where: { cpf: String(cpf) }, data: body })
        logs.updateRecordDB(context)
        return true
      } else if (name) {
        logs.info("Searching by name", context)
        await db.clients.update({ where: { name: String(name) }, data: body })
        logs.updateRecordDB(context)
        return true
      }
      return false
    } catch (error) {
      logs.error(error, context)
      return false
    }
  },
  delete: async (query: IQueryClients) => {
    const context = {
      file: "DBClients",
      function: "delete"
    }
    const { name = false, cpf = false } = query
    logs.infoContext(context)
    try {
      const db = await connectDB()
      if (name) {
        logs.info("Searching by name", context)
        await db.clients.delete({ where: { name: String(name) } })
        logs.deleteRecordDB(context)
      } else if (cpf) {
        logs.info("Searching by cpf", context)
        await db.clients.delete({ where: { cpf: String(cpf) } })
        logs.deleteRecordDB(context)
      }
      return true
    } catch (error) {
      logs.error(error, context)
      return false
    }
  }
}

export default controller
