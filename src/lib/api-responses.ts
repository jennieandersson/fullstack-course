import { NextResponse } from 'next/server'

export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function createSuccessResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(data, { status })
}

export function createNotFoundResponse(message: string = 'Resource not found') {
  return createErrorResponse(message, 404)
}

export function createForbiddenResponse(message: string = 'Forbidden') {
  return createErrorResponse(message, 403)
}

export function createUnauthorizedResponse(message: string = 'Unauthorized') {
  return createErrorResponse(message, 401)
}

export function createInternalServerErrorResponse(
  message: string = 'Internal server error'
) {
  return createErrorResponse(message, 500)
}
