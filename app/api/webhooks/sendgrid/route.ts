import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// POST /api/webhooks/sendgrid
// SendGrid posts an array of events
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) return NextResponse.json({ error: 'invalid-payload' }, { status: 400 });

    for (const ev of body) {
      const email = ev.email?.toLowerCase();
      const event = ev.event; // e.g., delivered, open, click, bounce
      if (!email || !event) continue;

      // Find the most recent invitation for this email that is not claimed/expired
      const invitation = await prisma.invitation.findFirst({ where: { email }, orderBy: { createdAt: 'desc' } });
      if (!invitation) continue;

      const updates: any = {};
      if (event === 'delivered') updates.deliveredAt = new Date();
      if (event === 'open') updates.openedAt = new Date();
      if (event === 'click') updates.clickedAt = new Date();
      if (event === 'bounce' || event === 'dropped' || event === 'failed') updates.status = 'failed';

      if (Object.keys(updates).length > 0) {
        await prisma.invitation.update({ where: { id: invitation.id }, data: updates });
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error('POST /api/webhooks/sendgrid error', err);
    return NextResponse.json({ error: err?.message || 'server-error' }, { status: 500 });
  }
}
