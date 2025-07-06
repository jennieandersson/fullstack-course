import { addNote } from '@/app/lib/database'
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
