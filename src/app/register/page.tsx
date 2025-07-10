'use client'

export default function RegisterPage() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error('Failed to register')
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'Unknown error')
      }

      window.location.href = '/'
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8'>
      <h1 className='text-2xl font-bold mb-4'>Register</h1>
      <form className='w-full max-w-sm' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-sm font-medium mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-sm font-medium mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='w-full px-3 py-2 border rounded'
            required
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Register
        </button>
      </form>
    </div>
  )
}
