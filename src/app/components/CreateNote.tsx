'use client'

import { useState, useRef, Dispatch, SetStateAction } from 'react'

export const CreateNote = ({
  setShouldRefreshList,
}: {
  setShouldRefreshList: Dispatch<SetStateAction<number>>
}) => {
  const [error, setError] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(false)

    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    try {
      const response = await fetch('/api/create-post', {
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
      setSuccess(true)
      setShouldRefreshList((prev) => prev + 1) // Trigger refresh in parent component
      formRef.current?.reset()
    } catch (error) {
      console.error('Error creating note:', error)
      setError(true)
      return
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <form
        ref={formRef}
        className='flex flex-col gap-4'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='Title'
          className='p-2 border border-gray-300 rounded'
          name='title'
        />
        <textarea
          placeholder='Content'
          className='p-2 border border-gray-300 rounded h-32'
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
      {error && <p className='text-red-500'>Error creating note</p>}
      {success && <p className='text-green-500'>Note created successfully!</p>}
    </>
  )
}
