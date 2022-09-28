import { Request, Response } from "express"
import connectDB from "../db/connect"
import modifyBody from "../helper/modifyBody"

const controller = {
  create: async (req: Request, res: Response) => {
    const body = req.body
    try {
      const db = await connectDB()

      const bodyModify = modifyBody.client(body)

      await db.clients.create({ data: bodyModify })

      res.sendStatus(201)
    } catch (error: any) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  read: async (req: Request, res: Response) => {
    const name = req.query.name
    const cpf = req.query.cpf

    try {
      const db = await connectDB()
      if (cpf) {
        const data = await db.clients.findUnique({
          where: { cpf: String(cpf) },
          include: { animals: true }
        })
        res.send(data)
      } else if (name) {
        const data = await db.clients.findUnique({
          where: { name: String(name) },
          include: { animals: true }
        })
        res.send(data)
      } else {
        const data = await db.clients.findMany()
        res.send(data)
      }
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  update: async (req: Request, res: Response) => {
    const name = req.query.name
    const cpf = req.query.cpf
    const body = req.body
    try {
      const db = await connectDB()
      if (name) {
        await db.clients.update({ where: { name: String(name) }, data: body })
      } else if (cpf) {
        await db.clients.update({ where: { cpf: String(cpf) }, data: body })
      }
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  },
  delete: async (req: Request, res: Response) => {
    const name = req.query.name
    const cpf = req.query.cpf
    try {
      const db = await connectDB()
      if (name) {
        await db.clients.delete({ where: { name: String(name) } })
      } else if (cpf) {
        await db.clients.delete({ where: { cpf: String(cpf) } })
      }
      res.sendStatus(200)
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  }
}

export default controller
