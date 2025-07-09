'use client'

import { Note } from '@/types/notes'
import clsx from 'clsx'
import { useState } from 'react'

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
  const [successDeleted, setSuccessDeleted] = useState(false)

  const handleDeleteNote = async (id: string) => {
    setSuccessDeleted(false)
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
      // set a state to indicate the note was deleted
      // and trigger the parent component to refresh the notes

      setSuccessDeleted(true)
      onNoteDeleted()
    } catch (error) {
      console.error('Error deleting note:', error)
    }
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center p-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
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
          className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
        >
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
      {successDeleted && (
        <div className='mb-4 text-green-500'>Note deleted successfully!</div>
      )}
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {notes.map((note, index) => (
          <li
            key={note.id}
            className={clsx(
              'bg-yellow-200 p-4 min-h-48 shadow-lg rounded-sm',
              'transform transition-all duration-200 hover:scale-105 hover:shadow-xl',
              'relative border border-yellow-300 hover:rotate-0 cursor-pointer',
              'flex flex-col',
              {
                'rotate-1': index % 3 === 0,
                '-rotate-1': index % 3 === 1,
                'rotate-0': index % 3 === 2,
              }
            )}
            style={{
              fontFamily: '"Comic Sans MS", cursive, sans-serif',
            }}
            title={`${note.title}\n\n${note.content}`}
          >
            <h3 className='text-lg font-bold mb-3 text-gray-800 line-clamp-2'>
              {note.title}
            </h3>
            {note.content && (
              <p className='text-sm text-gray-700 mb-2 line-clamp-3'>
                {note.content}
              </p>
            )}
            {/* delete button with a red circle and white x */}
            <button
              onClick={() => handleDeleteNote(note.id)}
              className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center transition-colors duration-200 shadow-sm hover:shadow-md'
              aria-label='Delete note'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3 w-3'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
