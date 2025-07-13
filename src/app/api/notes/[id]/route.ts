import { NextResponse } from 'next/server'
import { noteSchema } from '@/lib/validation/noteSchema'
import { withErrorHandling } from '@/lib/error-handling'
import { withAuthAndOwnership } from '@/lib/auth-utils'
import {
  createNotFoundResponse,
  createSuccessResponse,
} from '@/lib/api-responses'
import { noteQueries } from '@/lib/db-utils'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return withErrorHandling(async () => {
    const { id } = await params

    const note = await noteQueries.findById(id)

    if (!note) {
      return createNotFoundResponse('Note not found')
    }

    return withAuthAndOwnership(async () => {
      await noteQueries.delete(id)
      return createSuccessResponse({ success: true })
    }, note.userId)
  })
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  return withErrorHandling(async () => {
    const { id } = await params
    const body = await req.json()
    const parsed = noteSchema.parse(body)

    const { title, content } = parsed

    const note = await noteQueries.findById(id)

    if (!note) {
      return createNotFoundResponse('Note not found')
    }

    return withAuthAndOwnership(async () => {
      await noteQueries.update(id, {
        title: title.trim(),
        content: content?.trim() || null,
      })

      return createSuccessResponse({ success: true })
    }, note.userId)
  })
}
