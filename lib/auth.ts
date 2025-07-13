import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import prisma from './prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import type { JWT } from 'next-auth/jwt'
import type { Session, User } from 'next-auth'
import { env } from '../src/lib/env'
import { userQueries } from '@/lib/db-utils'

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Missing credentials')
        }
        const user = await userQueries.findByEmail(credentials.email)
        if (!user || !(await compare(credentials.password, user.password))) {
          throw new Error('Invalid credentials')
        }
        return user
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' as const },
  secret: env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }: { session: Session; token: JWT }) {
      if (token.id && session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
}
