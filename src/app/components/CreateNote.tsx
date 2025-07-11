'use client'

import { useState, useRef } from 'react'
import { toast } from 'react-toastify'

export const CreateNote = ({
  onNoteCreated,
}: {
  onNoteCreated: () => void
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      })

      if (!response.ok) {
        throw new Error('Failed to create note')
      }

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Unknown error')
      }

      toast.success('Note created successfully!')
      onNoteCreated()
      formRef.current?.reset()
    } catch (error) {
      console.error('Error creating note:', error)
      toast.error('Failed to create note')
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <form ref={formRef} className='flex flex-col gap-4' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title'
        className='p-2 border border-gray-300 rounded text-white placeholder-gray-500'
        name='title'
      />
      <textarea
        placeholder='Content'
        className='p-2 border border-gray-300 rounded h-32 text-white placeholder-gray-500'
        name='content'
      />
      <button
        disabled={loading}
        type='submit'
        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors'
      >
        Create Note
      </button>
    </form>
  )
}
