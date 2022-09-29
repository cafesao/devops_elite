import { PrismaClient } from "@prisma/client"
import senselogs from "senselogs"

const prisma = new PrismaClient()
const logs = new senselogs()

export default async function connectDB() {
  try {
    logs.info("Connecting to the database...")
    await prisma.$connect()
    logs.info("Connected to the database.")
    return prisma
  } catch (error: any) {
    throw error
  }
}
