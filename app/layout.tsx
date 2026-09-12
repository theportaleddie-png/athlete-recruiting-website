import './globals.css';
import './campaign.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'thePORTAL — Your next level starts here',
  description: 'The athlete recruiting platform connecting athletes, coaches, and opportunity.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="site-background">
      <body>{children}</body>
    </html>
  );
}
