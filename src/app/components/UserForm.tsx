import { useActionState } from 'react'
import { createUser } from '../actions/createUser'

export const UserForm = ({
  title,
  onSubmit,
}: {
  title: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}) => {
  const [formState, formAction, isPending] = useActionState(createUser, {
    success: false,
  })

  return (
    <>
      <h2 className='text-[20px] text-gray-700'>{title}</h2>
      <form
        {...(onSubmit ? { onSubmit } : { action: formAction })}
        className='flex flex-col gap-[16px] w-full max-w-[400px]'
        method='post'
      >
        <label className='flex flex-col gap-[8px]'>
          <span className='text-[14px] text-gray-700'>Enter your name</span>
          <input
            type='text'
            name='name'
            className='border border-gray-300 rounded-md p-[8px] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </label>
        <label className='flex flex-col gap-[8px]'>
          <span className='text-[14px] text-gray-700'>Enter your email</span>
          <input
            type='email'
            name='email'
            className='border border-gray-300 rounded-md p-[8px] text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </label>
        <button
          disabled={isPending}
          className='bg-blue-500 text-white rounded-md p-[12px] text-[16px] hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Submit
        </button>
      </form>

      {formState?.success && (
        <div className='toast'>User created successfully!</div>
      )}
    </>
  )
}
