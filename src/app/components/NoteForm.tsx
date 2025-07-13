'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { noteSchema, NoteInput } from '@/lib/validation/noteSchema'
import { X, Check } from 'lucide-react'

type NoteFormProps = {
  defaultValues?: NoteInput
  onSubmit: (data: NoteInput) => void
  onCancel?: () => void
  isSubmitting?: boolean
}

export function NoteForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
}: NoteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteInput>({
    resolver: zodResolver(noteSchema),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 p-4'>
      <div>
        <input
          type='text'
          placeholder='Note title'
          {...register('title')}
          className='w-full px-3 py-2 border rounded-md'
        />
        {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
      </div>
      <div>
        <textarea
          placeholder='Note content'
          rows={4}
          {...register('content')}
          className='w-full px-3 py-2 border rounded-md resize-none'
        />
        {errors.content && (
          <p className='text-red-500'>{errors.content.message}</p>
        )}
      </div>

      <div className='flex justify-end gap-2'>
        {onCancel && (
          <button
            type='button'
            onClick={onCancel}
            className='flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800'
          >
            <X className='h-4 w-4' />
            Cancel
          </button>
        )}
        <button
          type='submit'
          disabled={isSubmitting}
          className='flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-md hover:bg-blue-600 text-sm'
        >
          <Check className='h-4 w-4' />
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}
