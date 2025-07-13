import { noteSchema } from '@/lib/validation/noteSchema'
import { withErrorHandling } from '@/lib/error-handling'
import { withAuth } from '@/lib/auth-utils'
import { createSuccessResponse } from '@/lib/api-responses'
import { noteQueries } from '@/lib/db-utils'

export async function POST(req: Request) {
  return withErrorHandling(async () => {
    return withAuth(async (session) => {
      const body = await req.json()
      const parsed = noteSchema.parse(body) // This will throw ZodError if invalid

      const { title, content } = parsed

      const note = await noteQueries.create({
        title,
        content: content || null,
        userId: session.user.id,
      })

      return createSuccessResponse(note, 201)
    })
  })
}

export async function GET() {
  return withErrorHandling(async () => {
    return withAuth(async (session) => {
      const notes = await noteQueries.findByUserId(session.user.id)
      return createSuccessResponse(notes)
    })
  })
}
