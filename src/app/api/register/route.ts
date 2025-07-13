import { hash } from 'bcryptjs'
import { registerSchema } from '@/lib/validation/registerSchema'
import { withErrorHandling } from '@/lib/error-handling'
import { createSuccessResponse } from '@/lib/api-responses'
import { userQueries } from '@/lib/db-utils'

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    const body = await req.json()

    const parsed = registerSchema.parse(body) // This will throw ZodError if invalid

    const { email, password } = parsed

    await userQueries.create({
      email,
      password: await hash(password, 10),
    })

    return createSuccessResponse({ success: true }, 201)
  })
}
