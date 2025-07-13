import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.url(),
  DIRECT_URL: z.url(),
  NEXTAUTH_SECRET: z.string().min(1),
  NEXTAUTH_URL: z.url().optional(),
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
