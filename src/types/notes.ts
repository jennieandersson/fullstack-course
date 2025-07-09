// Import Prisma-generated types
import { Note } from '../generated/prisma'

// Re-export the main Note type
export type { Note }

// Create additional types based on your Prisma types
export type CreateNoteInput = {
  title: string
  content?: string | null
}

export type UpdateNoteInput = {
  title?: string
  content?: string | null
}

// Type for API responses
export type NoteResponse = {
  success: boolean
  note?: Note
  error?: string
}

export type NotesListResponse = {
  success: boolean
  notes?: Note[]
  error?: string
}

// Type for form data (before sending to API)
export type NoteFormData = {
  title: string
  content: string
}

// Pick specific fields from Note type
export type NotePreview = Pick<Note, 'id' | 'title' | 'createdAt'>

// Omit specific fields from Note type
export type NoteWithoutId = Omit<Note, 'id' | 'createdAt'>

export type NoteId = Pick<Note, 'id'>
