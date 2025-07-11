import { getServerSession } from 'next-auth'
import { LogoutButton } from './components/Buttons'
import { NotesManager } from './components/NotesManager'
import { authOptions } from '../../lib/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/signin')
  }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <LogoutButton />
        <h1 className='text-2xl font-bold mb-4'>
          Welcome, {session.user?.email}
        </h1>
        <NotesManager />
      </main>
    </div>
  )
}
