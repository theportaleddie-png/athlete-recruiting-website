import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET, POST for /api/teams/[teamId]/roster
export async function GET(req: Request, { params }: { params: { teamId: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session || !session.user || !session.user.email) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

    const userEmail = (session.user.email as string).toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return NextResponse.json({ error: 'user-not-found' }, { status: 404 });

    const { teamId } = params;
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) return NextResponse.json({ error: 'team-not-found' }, { status: 404 });

    // Simple ownership check: only team owner can list roster for now
    if (team.ownerUserId !== user.id) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

    const memberships = await prisma.rosterMembership.findMany({
      where: { teamId },
      include: { athlete: true, invitation: true },
    });

    return NextResponse.json({ ok: true, memberships }, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/teams/[teamId]/roster error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { teamId: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session || !session.user || !session.user.email) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

    const userEmail = (session.user.email as string).toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return NextResponse.json({ error: 'user-not-found' }, { status: 404 });

    const { teamId } = params;
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) return NextResponse.json({ error: 'team-not-found' }, { status: 404 });

    if (team.ownerUserId !== user.id) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

    const body = await req.json();
    const { athleteId } = body;
    if (!athleteId) return NextResponse.json({ error: 'athleteId-required' }, { status: 400 });

    // Upsert membership
    const membership = await prisma.rosterMembership.upsert({
      where: { athleteId_teamId: { athleteId, teamId } },
      update: { status: 'active', addedById: user.id },
      create: { athleteId, teamId, addedById: user.id, status: 'active', invitedAt: new Date() },
    });

    return NextResponse.json({ ok: true, membership }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/teams/[teamId]/roster error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}
