'use client'

import { UserForm } from './components/UserForm'

export default function Home() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    await fetch('/api/form', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1 className='text-[32px] font-bold text-gray-900'>Forms</h1>
        <UserForm title='Create a user' onSubmit={handleSubmit} />
        <UserForm title='Create a user with action' />
      </main>
    </div>
  )
}
