'use server'

export async function createUser(prevState: unknown, formData: FormData) {
  console.log(prevState)
  const name = formData.get('name')
  const email = formData.get('email')

  if (typeof name !== 'string' || typeof email !== 'string') {
    throw new Error('Invalid form data')
  }

  console.log('Creating user:', { name, email })

  return {
    success: true,
  }
}
