import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'

export async function withAuth<T>(
  handler: (session: { user: { id: string } }) => Promise<NextResponse<T>>
): Promise<NextResponse<T | { error: string }>> {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return handler(session as { user: { id: string } })
}

export async function withAuthAndOwnership<T>(
  handler: (session: { user: { id: string } }) => Promise<NextResponse<T>>,
  resourceUserId: string
): Promise<NextResponse<T | { error: string }>> {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.user.id !== resourceUserId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return handler(session as { user: { id: string } })
}
