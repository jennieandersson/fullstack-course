import { getServerSession } from 'next-auth'
import { LoginButton, LogoutButton, RegisterButton } from './components/Buttons'
import { NotesManager } from './components/NotesManager'
import { authOptions } from '../../lib/auth'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen p-8'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to My Notes</h1>
        <p className='mb-4'>Please sign in to manage your notes.</p>
        <LoginButton />
        <RegisterButton />
      </div>
    )
  }
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <LogoutButton />
        <h1 className='text-2xl font-bold mb-4'>
          Welcome, {session.user?.email}
        </h1>
        <p className='mb-4'>Here are your notes:</p>
        <NotesManager />
      </main>
    </div>
  )
}
