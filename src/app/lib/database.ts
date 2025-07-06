export type Note = {
  id: string
  title: string
  content: string
}

// Initialize with some sample data for testing
const notes: Note[] = [
  {
    id: '1',
    title: 'Welcome Note',
    content:
      'This is your first note! You can create more notes using the form above.',
  },
  {
    id: '2',
    title: 'Sample Todo',
    content:
      'Remember to:\n- Buy groceries\n- Walk the dog\n- Finish the project',
  },
]

export const addNote = (note: Note) => {
  notes.push(note)
}

export const getAllNotes = () => {
  return notes
}
