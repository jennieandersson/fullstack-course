// Import Prisma-generated types
import z from 'zod'
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

// Generic API Response types
export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

export type ApiError =
  | { error: string }
  | { error: ReturnType<typeof z.treeifyError> }

// Specific response types
export type NoteResponse = ApiResponse<Note>
export type NotesListResponse = ApiResponse<Note[]>
export type DeleteNoteResponse = ApiResponse<{ success: boolean }>

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
