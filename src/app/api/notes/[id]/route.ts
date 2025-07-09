import { NoteResponse } from '@/types/notes'
import { NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<Omit<NoteResponse, 'note'>>> {
  try {
    const { id } = params

    await prisma.note.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete note' },
      { status: 500 }
    )
  }
}
