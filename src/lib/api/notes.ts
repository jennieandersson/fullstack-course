import type { CreateNoteInput, UpdateNoteInput } from '@/types/notes'
import { API_ROUTES } from '../constants'

export async function fetchNotes() {
  const res = await fetch(API_ROUTES.NOTES)

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.error || 'Failed to fetch notes')
  }

  return res.json()
}

export async function createNote(data: CreateNoteInput) {
  const res = await fetch(API_ROUTES.NOTES, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.error || 'Failed to create note')
  }

  return res.json()
}

export async function deleteNote({ id }: { id: string }) {
  const res = await fetch(`${API_ROUTES.NOTES}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.error || 'Failed to delete note')
  }

  return res.json()
}

export async function editNote({
  id,
  ...data
}: UpdateNoteInput & { id: string }) {
  const res = await fetch(`${API_ROUTES.NOTES}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.error || 'Failed to edit note')
  }

  return res.json()
}
