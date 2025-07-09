'use client'

import { useCallback, useEffect, useState } from 'react'
import { CreateNote } from './CreateNote'
import { Notes } from './Notes'
import { Note } from '@/types/notes'

export const NotesManager = () => {
  const [notes, setNotes] = useState<Array<Note>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/notes')
      if (!response.ok) {
        throw new Error('Failed to fetch notes')
      }
      const data = await response.json()
      setNotes(data.notes)
    } catch (error) {
      console.error('Error fetching notes:', error)
      setError('Failed to load notes. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  return (
    <div className='w-full max-w-4xl mx-auto space-y-8'>
      <section>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Create Note</h2>
        <CreateNote onNoteCreated={fetchNotes} />
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Your Notes</h2>
        <Notes
          notes={notes}
          loading={loading}
          error={error}
          onNoteDeleted={fetchNotes}
        />
      </section>
    </div>
  )
}

export default NotesManager
