import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { CreateNoteInput, NoteResponse, NotesListResponse } from '@/types/notes'

export async function POST(req: Request): Promise<NextResponse<NoteResponse>> {
  try {
    const { title, content }: CreateNoteInput = await req.json()

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const newNote = {
      title: title.trim(),
      content: content.trim(),
    }

    const note = await prisma.note.create({ data: newNote })

    return NextResponse.json({
      success: true,
      note,
    })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create note' },
      { status: 500 }
    )
  }
}

export async function GET(): Promise<NextResponse<NotesListResponse>> {
  try {
    const notes = await prisma.note.findMany()
    return NextResponse.json({ success: true, notes })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}
