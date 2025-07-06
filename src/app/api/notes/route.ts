import { addNote, getAllNotes } from '@/app/lib/database'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const newNote = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
    }

    addNote(newNote)

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const notes = getAllNotes()
    return NextResponse.json(notes)
  } catch (error) {
    console.error('Error fetching notes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}
