'use client'

import { CreateNote } from './CreateNote'
import { Notes } from './Notes'

export const NotesManager = () => {
  return (
    <div className='w-full max-w-4xl mx-auto space-y-8'>
      <section>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Create Note</h2>
        <CreateNote />
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Your Notes</h2>
        <Notes />
      </section>
    </div>
  )
}

export default NotesManager
