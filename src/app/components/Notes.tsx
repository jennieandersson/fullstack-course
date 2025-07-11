'use client'

import { Note } from '@/types/notes'
import { useState } from 'react'
import { Edit2, Trash2, Loader, RefreshCw } from 'lucide-react'
import { EditNote } from './EditNote'
import { toast } from 'react-toastify'

export const Notes = ({
  notes,
  error,
  loading,
  onNoteDeleted,
}: {
  notes: Array<Note>
  error: string | null
  loading: boolean
  onNoteDeleted: () => void
}) => {
  const [editingNote, setEditingNote] = useState<string | null>(null)

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete note')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Unknown error')
      }
      toast.success('Note deleted successfully!')
      onNoteDeleted()
    } catch (error) {
      toast.error('Failed to delete note')
      console.error('Error deleting note:', error)
    }
  }

  const handleEditNote = (note: Note) => {
    setEditingNote(note.id)
  }

  const handleCancelEdit = () => {
    setEditingNote(null)
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center p-8'>
        <Loader className='h-8 w-8 animate-spin text-blue-500' />
        <span className='ml-2 text-gray-600'>Loading notes...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className='text-center p-8'>
        <p className='text-red-500 mb-4'>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors mx-auto'
        >
          <RefreshCw className='h-4 w-4' />
          Retry
        </button>
      </div>
    )
  }

  if (notes.length === 0) {
    return (
      <div className='text-center p-8'>
        <p className='text-gray-500 text-lg'>No notes yet!</p>
        <p className='text-gray-400 text-sm mt-2'>
          Create your first note using the form above.
        </p>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <div className='mb-4 text-right'>
        <span className='text-sm text-gray-500'>
          {notes.length} {notes.length === 1 ? 'note' : 'notes'}
        </span>
      </div>
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {notes.map((note) => (
          <li
            key={note.id}
            className='bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden'
          >
            {editingNote === note.id ? (
              <EditNote
                note={note}
                onCancel={handleCancelEdit}
                setEditingNote={setEditingNote}
                onNoteDeleted={onNoteDeleted}
              />
            ) : (
              <>
                <div className='p-4 pb-2'>
                  <h3 className='text-lg font-semibold mb-2 text-gray-800 line-clamp-2'>
                    {note.title}
                  </h3>
                  {note.content && (
                    <p className='text-sm text-gray-600 line-clamp-4'>
                      {note.content}
                    </p>
                  )}
                </div>
                <div className='flex justify-end gap-2 p-4 pt-2 border-t border-gray-100'>
                  <button
                    onClick={() => handleEditNote(note)}
                    className='p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors'
                    aria-label='Edit note'
                    title='Edit note'
                  >
                    <Edit2 className='h-4 w-4' />
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className='p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors'
                    aria-label='Delete note'
                    title='Delete note'
                  >
                    <Trash2 className='h-4 w-4' />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
