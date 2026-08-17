import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { sendInvitationEmail } from '../../../../../lib/mailer';
import { generateToken, hashToken } from '../../../../../lib/invite';

// POST /api/invitations/:id/resend
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: 'id-required' }, { status: 400 });

    const invitation = await prisma.invitation.findUnique({ where: { id } });
    if (!invitation) return NextResponse.json({ error: 'invitation-not-found' }, { status: 404 });

    // Generate a new token and update invitation
    const rawToken = generateToken();
    const tokenHash = hashToken(rawToken);
    const newExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    await prisma.invitation.update({ where: { id }, data: { tokenHash, attempts: { increment: 1 }, status: 'sent', sentAt: new Date(), expiresAt: newExpires } });

    // resend email
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://theportalathlete.org';
    const claimUrl = `${baseUrl}/claim?token=${rawToken}`;
    const subject = `You were invited to join a team on thePORTAL`;
    const html = `<p>Hi,</p>
<p>You were invited to join a team. Click below to claim your profile.</p>
<p><a href="${claimUrl}">Claim My Athlete Profile</a></p>
<p>This link expires on ${newExpires.toISOString()}.</p>`;

    const sendRes = await sendInvitationEmail(invitation.email, subject, html);
    if (!sendRes.ok) {
      await prisma.invitation.update({ where: { id }, data: { status: 'failed' } });
      return NextResponse.json({ ok: false, error: 'send-failed' }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: 'Invitation resent' }, { status: 200 });
  } catch (err: any) {
    console.error('POST /api/invitations/:id/resend error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}
