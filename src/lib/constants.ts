// API Routes
export const API_ROUTES = {
  NOTES: '/api/notes',
  AUTH: '/api/auth',
  REGISTER: '/api/register',
} as const

// Query Keys
export const QUERY_KEYS = {
  NOTES: ['notes'],
  USER: ['user'],
} as const

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: 'You must be logged in to perform this action',
  FORBIDDEN: 'You do not have permission to perform this action',
  NOT_FOUND: 'Resource not found',
  VALIDATION_ERROR: 'Please check your input and try again',
  SERVER_ERROR: 'Something went wrong. Please try again later',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  NOTE_CREATED: 'Note created successfully!',
  NOTE_UPDATED: 'Note updated successfully!',
  NOTE_DELETED: 'Note deleted successfully!',
  ACCOUNT_CREATED: 'Account created successfully!',
} as const
