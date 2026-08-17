import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { sendInvitationEmail } from '../../../lib/mailer';
import crypto from 'crypto';

// POST /api/invitations
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      teamId,
      email,
      firstName,
      lastName,
      sport,
      school,
      gradYear,
      position,
      jerseyNumber,
      addedById,
    } = body;

    if (!teamId || !email || !addedById) {
      return NextResponse.json({ error: 'teamId, email, addedById required' }, { status: 400 });
    }

    // Normalize email
    const normEmail = (email as string).trim().toLowerCase();

    // Check existing user by email
    const existingUser = await prisma.user.findUnique({ where: { email: normEmail } });

    // If user exists and has Athlete linked, create roster membership directly (no invitation token)
    if (existingUser) {
      // Try to find athlete for user
      const existingAthlete = await prisma.athlete.findUnique({ where: { userId: existingUser.id } });

      if (existingAthlete) {
        // Upsert roster membership
        await prisma.rosterMembership.upsert({
          where: { athleteId_teamId: { athleteId: existingAthlete.id, teamId } },
          update: { status: 'active', addedById },
          create: {
            athleteId: existingAthlete.id,
            teamId,
            addedById,
            status: 'active',
            invitedAt: new Date(),
          },
        });

        // Notify athlete via email that they've been added
        const subject = `You've been added to a roster on thePORTAL`;
        const html = `<p>Hi ${existingAthlete.firstName},</p>
<p>${addedById} added you to the team on thePORTAL. Sign in to review the roster.</p>`;
        await sendInvitationEmail(normEmail, subject, html);

        return NextResponse.json({ ok: true, message: 'Existing athlete added to roster' }, { status: 201 });
      }
      // If user exists but no athlete profile, we'll create an invitation and a placeholder athlete
    }

    // Create invitation token
    const token = crypto.randomBytes(32).toString('hex');
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    // Create invitation record and placeholder athlete inside transaction
    const invitation = await prisma.$transaction(async (tx) => {
      // Create a placeholder athlete record to serve as the canonical profile once claimed.
      const athlete = await tx.athlete.create({
        data: {
          firstName: firstName || '',
          lastName: lastName || '',
          sport: sport || null,
          school: school || null,
          gradYear: gradYear ? Number(gradYear) : null,
          position: position || null,
          jerseyNumber: jerseyNumber || null,
        },
      });

      const inv = await tx.invitation.create({
        data: {
          email: normEmail,
          tokenHash,
          teamId,
          invitedById: addedById,
          athleteSnapshot: {
            athleteId: athlete.id,
            firstName,
            lastName,
            sport,
            school,
            gradYear: gradYear ? Number(gradYear) : null,
            position,
            jerseyNumber,
          },
          status: 'sent',
          sentAt: new Date(),
          expiresAt,
        },
      });

      await tx.rosterMembership.create({
        data: {
          athleteId: athlete.id,
          teamId,
          addedById,
          status: 'invited',
          invitedAt: new Date(),
          invitationId: inv.id,
          expiresAt,
        },
      });

      return inv;
    });

    // Send email via provider with the raw token
    const baseUrl = process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || 'https://theportalathlete.org';
    const claimUrl = `${baseUrl}/claim?token=${token}`;
    const subject = `${firstName || ''} ${lastName || ''} — You were invited to join a team on thePORTAL`;
    const html = `<p>Hi ${firstName || 'Athlete'},</p>
<p>You were invited by a coach to join a team on thePORTAL.</p>
<ul>
  <li>Program: ${teamId}</li>
  <li>Sport: ${sport || '—'}</li>
  <li>Graduation Year: ${gradYear || '—'}</li>
</ul>
<p><a href="${claimUrl}">Claim My Athlete Profile</a></p>
<p>This link expires on ${expiresAt.toISOString()}.</p>`;

    const sendResult = await sendInvitationEmail(normEmail, subject, html);

    if (!sendResult.ok) {
      // mark invitation.failed
      await prisma.invitation.update({ where: { id: invitation.id }, data: { status: 'failed' } });
      return NextResponse.json({ error: 'failed-to-send', detail: sendResult.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: 'Invitation created and email sent' }, { status: 201 });
  } catch (err: any) {
    console.error('POST /api/invitations error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}
