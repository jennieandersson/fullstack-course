# TypeScript Types with Prisma

## Overview

This guide explains how to use Prisma-generated types and organize your TypeScript types effectively.

## 1. Prisma-Generated Types

Prisma automatically generates TypeScript types based on your schema. These are located in:

- `src/generated/prisma/index.d.ts`

### Main Types Available:

```typescript
// Basic model type
import { Note } from '@/generated/prisma'

// Or use the alias from our types file
import { Note } from '@/types/notes'
```

## 2. Type Organization

### Directory Structure

```
src/
  types/
    notes.ts          # Note-related types
    api.ts            # API response types
    forms.ts          # Form validation types
    index.ts          # Re-export all types
```

### Example: `src/types/notes.ts`

```typescript
import { Note } from '../generated/prisma'

// Re-export Prisma types
export type { Note }

// Input types for creating/updating
export type CreateNoteInput = {
  title: string
  content?: string | null
}

export type UpdateNoteInput = {
  title?: string
  content?: string | null
}

// API response types
export type NoteResponse = {
  success: boolean
  note?: Note
  error?: string
}

// Utility types using Prisma's Pick/Omit
export type NotePreview = Pick<Note, 'id' | 'title' | 'createdAt'>
export type NoteWithoutId = Omit<Note, 'id' | 'createdAt'>
```

## 3. Using Types in Different Files

### API Routes (`src/app/api/notes/route.ts`)

```typescript
import { CreateNoteInput, NoteResponse } from '@/types/notes'

export async function POST(req: Request): Promise<NextResponse<NoteResponse>> {
  const { title, content }: CreateNoteInput = await req.json()
  // ... rest of the code
}
```

### React Components

```typescript
import { Note, CreateNoteInput } from '@/types/notes'

interface NotesListProps {
  notes: Note[]
  onCreateNote: (input: CreateNoteInput) => void
}

export function NotesList({ notes, onCreateNote }: NotesListProps) {
  // ... component code
}
```

### Tests

```typescript
import { Note } from '@/types/notes'

const mockNote: Note = {
  id: 'test-id',
  title: 'Test Note',
  content: 'Test content',
  createdAt: new Date(),
}
```

## 4. Advanced Prisma Type Patterns

### Conditional Types

```typescript
// Type for partial updates
export type PartialNote = Partial<Pick<Note, 'title' | 'content'>>

// Type for required fields only
export type RequiredNoteFields = Required<Pick<Note, 'title'>>
```

### Array Types

```typescript
export type NotesList = Note[]
export type NotesMap = Record<string, Note>
```

### Validation Types

```typescript
export type NoteValidation = {
  isValid: boolean
  errors: {
    title?: string
    content?: string
  }
}
```

## 5. Best Practices

### ✅ Do:

- Keep types close to where they're used
- Use descriptive names (e.g., `CreateNoteInput` not `NoteInput`)
- Re-export Prisma types through your own types file
- Use utility types (`Pick`, `Omit`, `Partial`) for variations
- Type your API responses consistently

### ❌ Don't:

- Import Prisma types directly in components
- Create duplicate types that already exist in Prisma
- Use `any` type - leverage Prisma's generated types
- Forget to update types when schema changes

## 6. Common Type Patterns

### Form Handling

```typescript
export type NoteFormData = {
  title: string
  content: string
}

export type NoteFormErrors = {
  title?: string
  content?: string
}
```

### API Responses

```typescript
export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

export type NotesApiResponse = ApiResponse<Note[]>
export type SingleNoteApiResponse = ApiResponse<Note>
```

### Database Operations

```typescript
export type NoteCreateInput = Parameters<typeof prisma.note.create>[0]['data']
export type NoteUpdateInput = Parameters<typeof prisma.note.update>[0]['data']
```

## 7. Type Safety Benefits

With proper typing, you get:

- ✅ IntelliSense and autocomplete
- ✅ Compile-time error checking
- ✅ Refactoring safety
- ✅ Better documentation
- ✅ Reduced runtime errors

## 8. Regenerating Types

When you change your Prisma schema:

1. Update `prisma/schema.prisma`
2. Run `npx prisma generate`
3. Update your custom types if needed
4. Run tests to ensure compatibility

## 9. Testing with Types

```typescript
// Mock with proper types
const mockNotes: Note[] = [
  {
    id: 'test-id-1',
    title: 'Test Note 1',
    content: 'Content 1',
    createdAt: new Date(),
  },
]

// Type-safe expectations
expect(response.data).toEqual<Note[]>(mockNotes)
```

This approach ensures type safety throughout your application while leveraging Prisma's powerful type generation.
