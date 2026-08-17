import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { hashToken } from '../../../../lib/invite';

// POST /api/invitations/accept
// Body: { token }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;
    if (!token) return NextResponse.json({ error: 'token-required' }, { status: 400 });

    const tokenHash = hashToken(token);
    const invitation = await prisma.invitation.findFirst({ where: { tokenHash } });
    if (!invitation) return NextResponse.json({ error: 'invalid-token' }, { status: 404 });

    const now = new Date();
    if (invitation.expiresAt && now > invitation.expiresAt) return NextResponse.json({ error: 'expired' }, { status: 410 });

    // Check session
    const session = await getServerSession(authOptions as any);
    if (!session || !session.user || !session.user.email) {
      // Not authenticated; frontend should redirect to sign-in/signup with token preserved
      return NextResponse.json({ needAuth: true, invitation: { id: invitation.id, email: invitation.email, athleteSnapshot: invitation.athleteSnapshot } }, { status: 200 });
    }

    const userEmail = (session.user.email as string).toLowerCase();
    if (userEmail !== invitation.email.toLowerCase()) {
      // The signed-in user email does not match the invited email
      return NextResponse.json({ error: 'email-mismatch', message: 'Signed-in email does not match invitation email' }, { status: 403 });
    }

    // Claim: link user -> athlete and mark roster membership accepted/claimed
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) return NextResponse.json({ error: 'user-not-found' }, { status: 404 });

    // Transaction: link athlete.userId if not set, update invitation status, update roster membership
    await prisma.$transaction(async (tx) => {
      // Find athlete snapshot
      const athleteSnapshot = invitation.athleteSnapshot as any;
      const athleteId = athleteSnapshot?.athleteId;

      if (!athleteId) throw new Error('athlete id missing from snapshot');

      // Link athlete to user if not already linked
      const athlete = await tx.athlete.findUnique({ where: { id: athleteId } });
      if (!athlete) throw new Error('athlete not found');

      if (!athlete.userId) {
        await tx.athlete.update({ where: { id: athleteId }, data: { userId: user.id } });
      }

      // Update invitation
      await tx.invitation.update({ where: { id: invitation.id }, data: { status: 'claimed', claimedAt: new Date() } });

      // Update roster membership (find by invitationId)
      const membership = await tx.rosterMembership.findFirst({ where: { invitationId: invitation.id } });
      if (membership) {
        await tx.rosterMembership.update({ where: { id: membership.id }, data: { status: 'claimed', claimedAt: new Date(), acceptedAt: new Date() } });
      } else {
        // If not found, create active membership
        await tx.rosterMembership.create({ data: { athleteId, teamId: invitation.teamId, addedById: invitation.invitedById, status: 'active', invitedAt: new Date(), claimedAt: new Date(), acceptedAt: new Date(), invitationId: invitation.id } });
      }
    });

    return NextResponse.json({ ok: true, message: 'Invitation claimed and roster membership linked' }, { status: 200 });
  } catch (err: any) {
    console.error('POST /api/invitations/accept error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}
