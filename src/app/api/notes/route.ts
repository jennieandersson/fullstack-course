import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { CreateNoteInput, NoteResponse, NotesListResponse } from '@/types/notes'
import { authOptions } from '../../../../lib/auth'
import { getServerSession } from 'next-auth/next'
import { Session } from 'next-auth'

export async function POST(req: Request): Promise<NextResponse<NoteResponse>> {
  const session = (await getServerSession(authOptions)) as Session | null
  if (!session || !session.user?.id)
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )

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
      user: {
        connect: {
          id: session.user.id,
        },
      },
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
  const session = (await getServerSession(authOptions)) as Session | null
  if (!session || !session.user?.id)
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    )

  try {
    const notes = await prisma.note.findMany({
      where: { userId: session.user.id },
    })
    return NextResponse.json({ success: true, notes }, { status: 200 })
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}
