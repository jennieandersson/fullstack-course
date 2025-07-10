import { GET, POST } from '@/app/api/notes/route'
import { NextRequest } from 'next/server'
import { Note } from '@/types/notes'

// Mock Prisma
jest.mock('../../../lib/prisma', () => ({
  __esModule: true,
  default: {
    note: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}))

import prisma from '../../../lib/prisma'

const mockCreate = prisma.note.create as jest.MockedFunction<
  typeof prisma.note.create
>
const mockFindMany = prisma.note.findMany as jest.MockedFunction<
  typeof prisma.note.findMany
>

describe('/api/notes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST', () => {
    it('should create a new note successfully', async () => {
      const requestBody = {
        title: 'Test Note',
        content: 'This is a test note content',
      }

      const mockCreatedNote: Note = {
        id: 'test-uuid-123',
        title: 'Test Note',
        content: 'This is a test note content',
        createdAt: new Date(),
        userId: 'test-user-id',
      }

      mockCreate.mockResolvedValue(mockCreatedNote)

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData).toEqual({ success: true })
      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          title: 'Test Note',
          content: 'This is a test note content',
        },
      })
    })

    it('should trim whitespace from title and content', async () => {
      const requestBody = {
        title: '  Test Note  ',
        content: '  This is a test note content  ',
      }

      const mockCreatedNote = {
        id: 'test-uuid-123',
        title: 'Test Note',
        content: 'This is a test note content',
        createdAt: new Date(),
        userId: 'test-user-id',
      }

      mockCreate.mockResolvedValue(mockCreatedNote)

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      await POST(request)

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          title: 'Test Note',
          content: 'This is a test note content',
        },
      })
    })

    it('should return 400 when title is missing', async () => {
      const requestBody = {
        content: 'This is a test note content',
      }

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData).toEqual({
        error: 'Title and content are required',
      })
      expect(mockCreate).not.toHaveBeenCalled()
    })

    it('should return 400 when content is missing', async () => {
      const requestBody = {
        title: 'Test Note',
      }

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(400)
      expect(responseData).toEqual({
        error: 'Title and content are required',
      })
      expect(mockCreate).not.toHaveBeenCalled()
    })

    it('should return 500 when database operation fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockCreate.mockRejectedValue(new Error('Database error'))

      const requestBody = {
        title: 'Test Note',
        content: 'This is a test note content',
      }

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData).toEqual({
        error: 'Failed to create note',
      })
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error creating note:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })

  describe('GET', () => {
    it('should return all notes successfully', async () => {
      const mockNotes: Note[] = [
        {
          id: 'note-uuid-1',
          title: 'Note 1',
          content: 'Content 1',
          createdAt: new Date('2025-07-07T21:03:42.693Z'),
          userId: 'test-user-id',
        },
        {
          id: 'note-uuid-2',
          title: 'Note 2',
          content: 'Content 2',
          createdAt: new Date('2025-07-07T21:03:42.693Z'),
          userId: 'test-user-id',
        },
      ]

      mockFindMany.mockResolvedValue(mockNotes)

      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData).toEqual([
        {
          id: 'note-uuid-1',
          title: 'Note 1',
          content: 'Content 1',
          createdAt: '2025-07-07T21:03:42.693Z',
        },
        {
          id: 'note-uuid-2',
          title: 'Note 2',
          content: 'Content 2',
          createdAt: '2025-07-07T21:03:42.693Z',
        },
      ])
      expect(mockFindMany).toHaveBeenCalled()
    })

    it('should return 500 when database operation fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
      mockFindMany.mockRejectedValue(new Error('Database error'))

      const response = await GET()
      const responseData = await response.json()

      expect(response.status).toBe(500)
      expect(responseData).toEqual({
        error: 'Failed to fetch notes',
      })
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching notes:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })
})
