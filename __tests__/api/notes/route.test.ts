import { GET, POST } from '@/app/api/notes/route';
import { addNote, getAllNotes } from '@/app/lib/database';
import { NextRequest } from 'next/server';

// Mock the database functions
jest.mock('@/app/lib/database', () => ({
  addNote: jest.fn(),
  getAllNotes: jest.fn(),
}));

// Mock crypto.randomUUID
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: jest.fn(() => 'test-uuid-123'),
  },
});

const mockedAddNote = addNote as jest.MockedFunction<typeof addNote>;
const mockedGetAllNotes = getAllNotes as jest.MockedFunction<typeof getAllNotes>;

describe('/api/notes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST', () => {
    it('should create a new note successfully', async () => {
      const requestBody = {
        title: 'Test Note',
        content: 'This is a test note content',
      };

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toEqual({ success: true });
      expect(mockedAddNote).toHaveBeenCalledWith({
        id: 'test-uuid-123',
        title: 'Test Note',
        content: 'This is a test note content',
      });
    });

    it('should trim whitespace from title and content', async () => {
      const requestBody = {
        title: '  Test Note  ',
        content: '  This is a test note content  ',
      };

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await POST(request);

      expect(mockedAddNote).toHaveBeenCalledWith({
        id: 'test-uuid-123',
        title: 'Test Note',
        content: 'This is a test note content',
      });
    });

    it('should return 400 when title is missing', async () => {
      const requestBody = {
        content: 'This is a test note content',
      };

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData).toEqual({
        error: 'Title and content are required',
      });
      expect(mockedAddNote).not.toHaveBeenCalled();
    });

    it('should return 400 when content is missing', async () => {
      const requestBody = {
        title: 'Test Note',
      };

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(400);
      expect(responseData).toEqual({
        error: 'Title and content are required',
      });
      expect(mockedAddNote).not.toHaveBeenCalled();
    });

    it('should return 500 when database operation fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockedAddNote.mockImplementation(() => {
        throw new Error('Database error');
      });

      const requestBody = {
        title: 'Test Note',
        content: 'This is a test note content',
      };

      const request = new NextRequest('http://localhost:3000/api/notes', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData).toEqual({
        error: 'Failed to create note',
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error creating note:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('GET', () => {
    it('should return all notes successfully', async () => {
      const mockNotes = [
        { id: '1', title: 'Note 1', content: 'Content 1' },
        { id: '2', title: 'Note 2', content: 'Content 2' },
      ];

      mockedGetAllNotes.mockReturnValue(mockNotes);

      const response = await GET();
      const responseData = await response.json();

      expect(response.status).toBe(200);
      expect(responseData).toEqual(mockNotes);
      expect(mockedGetAllNotes).toHaveBeenCalled();
    });

    it('should return 500 when database operation fails', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      mockedGetAllNotes.mockImplementation(() => {
        throw new Error('Database error');
      });

      const response = await GET();
      const responseData = await response.json();

      expect(response.status).toBe(500);
      expect(responseData).toEqual({
        error: 'Failed to fetch notes',
      });
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching notes:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
