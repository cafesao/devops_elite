import { Request, Response } from "express"
import connectDB from "../db/connect"
import modifyBody from "../helper/modifyBody"

const controller = {
  create: async (req: Request, res: Response) => {
    const body = req.body
    try {
      const db = await connectDB()
      const bodyModify = modifyBody.animal(body)
      await db.animals.create({ data: bodyModify })
      res.sendStatus(201)
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  read: async (req: Request, res: Response) => {
    const id = req.query.id
    try {
      const db = await connectDB()
      if (id) {
        const data = await db.animals.findUnique({
          where: { id: Number(id) },
          include: { client: true }
        })
        res.send(data)
      } else {
        const data = await db.animals.findMany()
        res.send(data)
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  update: async (req: Request, res: Response) => {
    const id = req.query.id
    const body = req.body
    try {
      const db = await connectDB()
      await db.animals.update({ where: { id: Number(id) }, data: body })
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  delete: async (req: Request, res: Response) => {
    const id = req.query.id
    try {
      const db = await connectDB()
      await db.animals.delete({ where: { id: Number(id) } })
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}

export default controller
