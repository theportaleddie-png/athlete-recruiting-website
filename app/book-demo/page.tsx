import Link from 'next/link';

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? 'https://calendly.com/your-team/demo';

export default function BookDemoPage() {
  return (
    <main className="booking-shell">
      <header className="booking-header">
        <Link className="brand" href="/">the<span>PORTAL</span></Link>
        <Link className="back-link" href="/">← Back to home</Link>
      </header>
      <section className="booking-intro">
        <p className="eyebrow">Let&apos;s talk</p>
        <h1>Power on<br /><em>with thePORTAL.</em></h1>
        <p>Choose a time that works for you. We&apos;ll show you how thePORTAL can help your athletes get discovered and your program move forward.</p>
      </section>
      <section className="calendly-frame" aria-label="Schedule a demo">
        <iframe title="Schedule a demo with thePORTAL" src={calendlyUrl} loading="eager" />
      </section>
    </main>
  );
}
