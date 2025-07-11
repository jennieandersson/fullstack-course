import { Check, X } from 'lucide-react'
import { Note } from '@/types/notes'
import { toast } from 'react-toastify'

export const EditNote = ({
  note,
  onCancel,
  onNoteDeleted,
  setEditingNote,
}: {
  note: Note
  onCancel: () => void
  onNoteDeleted: () => void
  setEditingNote: (id: string | null) => void
}) => {
  const handleSaveEdit = async (
    event: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const content = formData.get('content') as string

    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update note')
      }
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Unknown error')
      }

      setEditingNote(null)
      toast.success('Note updated successfully!')
      onNoteDeleted() // Refresh the notes
    } catch (error) {
      console.error('Error updating note:', error)
      toast.error('Failed to update note')
    }
  }

  return (
    <form className='p-4' onSubmit={(e) => handleSaveEdit(e, note.id)}>
      <input
        type='text'
        name='title'
        defaultValue={note.title}
        className='w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500'
        placeholder='Note title'
      />
      <textarea
        name='content'
        defaultValue={note.content || ''}
        className='w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500'
        rows={4}
        placeholder='Note content'
      />
      <div className='flex justify-end gap-2'>
        <button
          onClick={onCancel}
          className='flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors'
        >
          <X className='h-3 w-3' />
          Cancel
        </button>
        <button
          type='submit'
          className='flex items-center gap-1 px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors'
        >
          <Check className='h-3 w-3' />
          Save
        </button>
      </div>
    </form>
  )
}
