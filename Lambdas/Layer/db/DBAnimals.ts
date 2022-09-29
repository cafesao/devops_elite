import connectDB from "../db/connect"
import modifyBody from "../helper/modifyBody"
import { IBodyAnimals, IQueryAnimals } from "../interface/controllers"
import logs from "../logs/controllerLogs"

const controller = {
  create: async (body: IBodyAnimals) => {
    const context = {
      file: "DBAnimals",
      function: "create"
    }
    logs.infoContext(context)
    try {
      const db = await connectDB()
      const bodyModify = modifyBody.animal(body)

      await db.animals.create({ data: bodyModify })
      logs.createRecordDB(context)
      return true
    } catch (error: any) {
      console.log(error)
      return false
    }
  },
  read: async (query: IQueryAnimals) => {
    const context = {
      file: "DBAnimals",
      function: "read"
    }
    const { id = false } = query
    logs.infoContext(context)
    try {
      const db = await connectDB()
      if (id) {
        logs.info("Searching by id", context)
        const data = await db.animals.findUnique({
          where: { id: Number(id) },
          include: { client: true }
        })
        logs.dataRecordDB(context, data)
        return data
      } else {
        logs.info("Searching by all", context)
        const data = await db.animals.findMany()
        logs.dataRecordDB(context, data)
        return data
      }
    } catch (error) {
      console.log(error)
      return false
    }
  },
  update: async (body: IBodyAnimals, query: IQueryAnimals) => {
    const context = {
      file: "DBAnimals",
      function: "update"
    }
    const { id = false } = query
    logs.infoContext(context)
    try {
      const db = await connectDB()

      if (id) {
        logs.info("Searching by id", context)
        await db.animals.update({ where: { id: Number(id) }, data: body })
        logs.updateRecordDB(context)
        return true
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  },
  delete: async (query: IQueryAnimals) => {
    const context = {
      file: "DBAnimals",
      function: "delete"
    }
    const { id = false } = query
    logs.infoContext(context)
    try {
      const db = await connectDB()

      if (id) {
        logs.info("Searching by id", context)
        await db.animals.delete({ where: { id: Number(id) } })
        logs.deleteRecordDB(context)
        return true
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}

export default controller
