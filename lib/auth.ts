import { getServerSession } from 'next-auth'
import { authOptions } from '../app/api/auth/[...nextauth]/route'
import { prisma } from './prisma'
import { NextResponse } from 'next/server'

export async function currentUser() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null
  return prisma.user.findUnique({ where: { email: session.user.email.toLowerCase() } })
}
export function unauthorized() { return NextResponse.json({ error: 'unauthenticated' }, { status: 401 }) }
export function forbidden() { return NextResponse.json({ error: 'forbidden' }, { status: 403 }) }
