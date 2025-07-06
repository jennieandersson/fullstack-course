import { getAllNotes } from '@/app/lib/database'
import { NextResponse } from 'next/server'

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
