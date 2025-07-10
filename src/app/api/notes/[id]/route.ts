import { NoteResponse } from '@/types/notes'
import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { authOptions } from '../../../../../lib/auth'
import { getServerSession } from 'next-auth/next'

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Omit<NoteResponse, 'note'>>> {
  const session = await getServerSession(authOptions)
  if (!session || !session.user?.id) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const { id } = params

    // First check if the note exists and belongs to the user
    const existingNote = await prisma.note.findUnique({
      where: { id },
      select: { userId: true },
    })

    if (!existingNote) {
      return NextResponse.json(
        { success: false, error: 'Note not found' },
        { status: 404 }
      )
    }

    if (existingNote.userId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    await prisma.note.delete({ where: { id } })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete note' },
      { status: 500 }
    )
  }
}
