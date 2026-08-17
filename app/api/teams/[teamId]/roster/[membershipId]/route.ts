import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../../auth/[...nextauth]/route';

// DELETE /api/teams/[teamId]/roster/[membershipId]
export async function DELETE(req: Request, { params }: { params: { teamId: string; membershipId: string } }) {
  try {
    const session = await getServerSession(authOptions as any);
    if (!session || !session.user || !session.user.email) return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

    const userEmail = (session.user.email as string).toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return NextResponse.json({ error: 'user-not-found' }, { status: 404 });

    const { teamId, membershipId } = params;
    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) return NextResponse.json({ error: 'team-not-found' }, { status: 404 });

    if (team.ownerUserId !== user.id) return NextResponse.json({ error: 'forbidden' }, { status: 403 });

    // Soft-remove: update status to removed
    const membership = await prisma.rosterMembership.update({ where: { id: membershipId }, data: { status: 'removed', removedAt: new Date() } });

    return NextResponse.json({ ok: true, membership }, { status: 200 });
  } catch (err: any) {
    console.error('DELETE /api/teams/[teamId]/roster/[membershipId] error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}
