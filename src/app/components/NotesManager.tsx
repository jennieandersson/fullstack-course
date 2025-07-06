'use client'

import { useState } from 'react'
import { CreateNote } from './CreateNote'
import { Notes } from './Notes'

export const NotesManager = () => {
  const [shouldRefreshList, setShouldRefreshList] = useState(0)

  return (
    <div className='w-full max-w-4xl mx-auto space-y-8'>
      <section>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Create Note</h2>
        <CreateNote setShouldRefreshList={setShouldRefreshList} />
      </section>

      <section>
        <h2 className='text-2xl font-bold mb-4 text-gray-800'>Your Notes</h2>
        <Notes shouldRefreshList={shouldRefreshList} />
      </section>
    </div>
  )
}

export default NotesManager
