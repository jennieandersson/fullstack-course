'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema, type NoteInput } from '@/lib/validation/noteSchema'
import { NoteForm } from './NoteForm'
import { useNotes } from '@/hooks/useNotes'

export const CreateNote = () => {
  const { createNote, isCreating } = useNotes()

  const { reset } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  const handleCreate = (data: NoteInput) => {
    createNote(data, () => {
      reset()
    })
  }

  return <NoteForm onSubmit={handleCreate} isSubmitting={isCreating} />
}
