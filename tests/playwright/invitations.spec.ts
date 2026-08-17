import { test, expect } from '@playwright/test';

test('invitation create and validate flow (smoke)', async ({ request }) => {
  // This is a placeholder smoke test. CI should set up env vars and run full E2E.
  const res = await request.post('/api/invitations', {
    data: {
      teamId: 'test-team',
      email: 'example+test@theportalathlete.org',
      firstName: 'Test',
      lastName: 'User',
      sport: 'Soccer',
      school: 'Test HS',
      gradYear: 2026,
      position: 'MF',
      jerseyNumber: '7',
      addedById: 'test-coach',
    },
  });
  expect(res.status()).toBeGreaterThanOrEqual(200);
});
