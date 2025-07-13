'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, SignInInput } from '@/lib/validation/signInSchema'
import { useState } from 'react'

export default function SignInPage() {
  const router = useRouter()
  const [authError, setAuthError] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInInput) => {
    setAuthError('')
    try {
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (result?.error) {
        setAuthError('Invalid credentials')
      } else {
        router.push('/')
      }
    } catch (err) {
      console.error('Sign in error:', err)
      setAuthError('An error occurred. Please try again.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Sign in to your account
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          {(authError || errors.email || errors.password) && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
              {authError || errors.email?.message || errors.password?.message}
            </div>
          )}
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='email' className='sr-only'>
                Email address
              </label>
              <input
                id='email'
                type='email'
                autoComplete='email'
                {...register('email')}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Email address'
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                type='password'
                autoComplete='current-password'
                {...register('password')}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                placeholder='Password'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              disabled={isSubmitting}
              className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className='flex items-center justify-center'>
            <div className='text-sm'>
              <span className='text-gray-600'>
                Don&apos;t have an account?{' '}
              </span>
              <button
                type='button'
                onClick={() => router.push('/register')}
                className='font-medium text-indigo-600 hover:text-indigo-500'
              >
                Register here
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
