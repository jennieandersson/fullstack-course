import { PrismaClient } from '../src/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'
import { env } from '../src/lib/env'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate())

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
