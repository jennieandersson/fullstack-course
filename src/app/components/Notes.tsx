'use client'

import clsx from 'clsx'
import { type Note } from '../lib/database'

export const Notes = ({
  notes,
  error,
  loading,
}: {
  notes: Array<Note>
  error: string | null
  loading: boolean
}) => {
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
            <p className='text-sm text-gray-700 leading-relaxed flex-1 overflow-hidden'>
              {note.content.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < note.content.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
            {note.content.length > 150 && (
              <div className='text-xs text-gray-500 mt-2 italic'>
                Click to see full content
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
