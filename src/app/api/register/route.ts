import { hash } from 'bcryptjs'
import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'

export async function POST(req: Request) {
  const body = await req.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Missing email or password' },
      { status: 400 }
    )
  }

  await prisma.user.create({
    data: {
      email,
      password: await hash(password, 10),
    },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
