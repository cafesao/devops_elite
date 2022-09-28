import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function connectDB() {
  try {
    await prisma.$connect()
    return prisma
  } catch (error: any) {
    throw error
  }
}
