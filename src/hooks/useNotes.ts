'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { fetchNotes, createNote, editNote, deleteNote } from '@/lib/api/notes'
import { QUERY_KEYS, SUCCESS_MESSAGES } from '@/lib/constants'
import type { Note, CreateNoteInput, UpdateNoteInput } from '@/types/notes'

export function useNotes() {
  const queryClient = useQueryClient()

  const {
    data: notes = [],
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: QUERY_KEYS.NOTES,
    queryFn: fetchNotes,
  })

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.NOTE_CREATED)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTES })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create note'
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: editNote,
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.NOTE_UPDATED)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTES })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update note'
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.NOTE_DELETED)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTES })
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete note'
      )
    },
  })

  return {
    notes,
    isLoading,
    error,
    createNote: (data: CreateNoteInput, onSuccess?: () => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          onSuccess?.()
        },
      })
    },
    updateNote: (
      data: UpdateNoteInput & { id: string },
      onSuccess?: () => void
    ) => {
      updateMutation.mutate(data, {
        onSuccess: () => {
          onSuccess?.()
        },
      })
    },
    deleteNote: (id: string) => deleteMutation.mutate({ id }),
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
