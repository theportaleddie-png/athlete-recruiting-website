import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET || process.env.BETTER_AUTH_SECRET,
  providers: [CredentialsProvider({ credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } }, async authorize(credentials) {
    if (!credentials?.email || !credentials.password) return null
    const user = await prisma.user.findUnique({ where: { email: credentials.email.trim().toLowerCase() } })
    if (!user?.passwordHash || !await bcrypt.compare(credentials.password, user.passwordHash)) return null
    return { id: user.id, email: user.email, role: user.role }
  } })],
  callbacks: { jwt: async ({ token, user }) => { if (user) token.role = (user as { role?: string }).role; return token }, session: async ({ session, token }) => { if (session.user) Object.assign(session.user, { id: token.sub, role: token.role }); return session } },
}
