import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Next.js App',
  description: 'Minimal Next.js app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
