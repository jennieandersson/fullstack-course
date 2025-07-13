import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import {
  createErrorResponse,
  createInternalServerErrorResponse,
} from './api-responses'

export function handleApiError(error: unknown): NextResponse {
  console.error('API Error:', error)

  if (error instanceof ZodError) {
    return createErrorResponse(
      'Validation error: ' +
        error.issues.map((issue) => issue.message).join(', '),
      400
    )
  }

  if (error instanceof Error) {
    return createErrorResponse(error.message, 500)
  }

  return createInternalServerErrorResponse()
}

export async function withErrorHandling<T>(
  handler: () => Promise<T>
): Promise<T | NextResponse> {
  try {
    return await handler()
  } catch (error) {
    return handleApiError(error)
  }
}
