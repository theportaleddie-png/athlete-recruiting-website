A new feature branch to implement invitations, roster memberships, and the initial backend pieces for thePORTAL athlete invitations.

Files added:
- prisma/schema.prisma : Prisma schema with Users, Athletes, Teams, RosterMemberships, Invitations
- lib/prisma.ts : Prisma client helper
- lib/mailer.ts : SendGrid mailer wrapper (uses SENDGRID_API_KEY and SENDER_EMAIL)
- app/api/invitations/route.ts : POST endpoint to create invitations (creates placeholder athlete + invitation + roster membership)
- app/api/invitations/validate/route.ts : GET endpoint to validate an invitation token

Next steps (I'll implement these in follow-up commits):
- NextAuth integration for authentication and email verification
- Invitation accept flow (claiming and linking a user to an athlete)
- Resend, revoke, and tracking endpoints
- Frontend wiring for Add Prospect modal and search
- E2E tests

To test locally:
1. Add a Postgres DATABASE_URL env var and run `npx prisma migrate dev --name init` then `npx prisma generate`.
2. Set SENDGRID_API_KEY and SENDER_EMAIL (or leave unset to skip actual sending).
3. Start Next dev server.
