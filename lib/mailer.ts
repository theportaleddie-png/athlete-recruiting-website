import sgMail from '@sendgrid/mail';

const API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = process.env.SENDER_EMAIL || 'no-reply@theportalathlete.org';

if (API_KEY) sgMail.setApiKey(API_KEY);

export async function sendInvitationEmail(to: string, subject: string, html: string) {
  if (!API_KEY) {
    console.warn('SENDGRID_API_KEY not configured — skipping email send');
    return { ok: false, error: 'no-mailer-configured' };
  }

  const msg = {
    to,
    from: FROM_EMAIL,
    subject,
    html,
  };

  try {
    const res = await sgMail.send(msg as any);
    return { ok: true, res };
  } catch (err: any) {
    console.error('sendInvitationEmail error', err);
    return { ok: false, error: err?.message || 'send-failed' };
  }
}
