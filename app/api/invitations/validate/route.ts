import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import crypto from 'crypto';

// GET /api/invitations/validate?token=...
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const token = url.searchParams.get('token');
    if (!token) return NextResponse.json({ valid: false, error: 'token-required' }, { status: 400 });

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const inv = await prisma.invitation.findFirst({ where: { tokenHash } });
    if (!inv) return NextResponse.json({ valid: false, error: 'invalid-token' }, { status: 404 });

    const now = new Date();
    if (inv.expiresAt && now > inv.expiresAt) return NextResponse.json({ valid: false, error: 'expired' }, { status: 410 });

    // Return snapshot and team info
    const team = await prisma.team.findUnique({ where: { id: inv.teamId } });

    return NextResponse.json({ valid: true, invitation: { id: inv.id, email: inv.email, athleteSnapshot: inv.athleteSnapshot, team } }, { status: 200 });
  } catch (err: any) {
    console.error('GET /api/invitations/validate error', err);
    return NextResponse.json({ valid: false, error: err?.message || 'server-error' }, { status: 500 });
  }
}
