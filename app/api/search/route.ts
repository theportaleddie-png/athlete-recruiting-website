import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';

// GET /api/search?q=...
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session || !session.user || !session.user.email) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const limit = Number(url.searchParams.get('limit') || '25');

    const terms = q.trim();
    if (!terms) return NextResponse.json({ results: [] }, { status: 200 });

    // Basic search across athlete fields
    const athletes = await prisma.athlete.findMany({
      where: {
        OR: [
          { firstName: { contains: terms, mode: 'insensitive' } },
          { lastName: { contains: terms, mode: 'insensitive' } },
          { school: { contains: terms, mode: 'insensitive' } },
          { sport: { contains: terms, mode: 'insensitive' } },
        ],
      },
      take: limit,
    });

    return NextResponse.json({ results: athletes }, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/search error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}
