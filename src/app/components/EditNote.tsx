import { NoteForm } from './NoteForm'
import { NoteInput } from '@/lib/validation/noteSchema'
import { Note } from '@/types/notes'
import { useNotes } from '@/hooks/useNotes'

export const EditNote = ({
  note,
  onCancel,
  setEditingNote,
}: {
  note: Note
  onCancel: () => void
  setEditingNote: (id: string | null) => void
}) => {
  const { updateNote, isUpdating } = useNotes()

  const handleEditSubmit = (data: NoteInput) => {
    updateNote({ id: note.id, ...data }, () => {
      setEditingNote(null)
    })
  }

  return (
    <NoteForm
      defaultValues={{ title: note.title, content: note.content || '' }}
      onSubmit={handleEditSubmit}
      onCancel={onCancel}
      isSubmitting={isUpdating}
    />
  )
}
