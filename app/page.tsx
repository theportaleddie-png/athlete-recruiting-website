import Link from 'next/link';

export default function Page() {
  return (
    <main className="site-shell">
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" href="/">
          the<span>PORTAL</span>
        </Link>
        <div className="nav-links">
          <Link href="/player-card">Build your Player Card</Link>
          <a href="#platform">Platform</a>
          <a href="#why-us">Why thePORTAL</a>
          <Link className="nav-cta" href="/book-demo">Request demo <span aria-hidden="true">↗</span></Link>
        </div>
      </nav>

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <p className="eyebrow">The athlete recruiting platform</p>
          <h1 id="hero-heading">Your next level<br /><em>starts here.</em></h1>
          <p className="hero-description">thePORTAL brings athletes, coaches, and opportunity together in one place—so every player can power on.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/book-demo">Request a demo <span aria-hidden="true">↗</span></Link>
            <a className="text-link" href="#platform">Explore the platform <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="hero-art" aria-label="Athlete profile preview">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="profile-card">
            <div className="profile-top"><span className="status-dot" /> ATHLETE PROFILE <span>•••</span></div>
            <div className="avatar">AM</div>
            <p className="profile-name">Alex Morgan</p>
            <p className="profile-meta">Guard · Class of 2027</p>
            <div className="profile-stats"><span><strong>3.8</strong><small>GPA</small></span><span><strong>24</strong><small>PPG</small></span><span><strong>14</strong><small>Offers</small></span></div>
            <div className="profile-bar"><span /></div>
            <p className="profile-footer">Profile strength <strong>92%</strong></p>
          </div>
          <div className="floating-note note-top">PERFORMANCE <strong>+28%</strong></div>
          <div className="floating-note note-bottom">MENTORSHIP <strong>ACTIVE</strong></div>
        </div>
      </section>

      <section className="pillars" id="platform" aria-label="Platform pillars">
        <div><span>01</span><h2>Education</h2><p>Build the foundation for what comes next.</p></div>
        <div><span>02</span><h2>Performance</h2><p>Turn your work into a profile that gets seen.</p></div>
        <div><span>03</span><h2>Mentorship</h2><p>Get guidance from people who have been there.</p></div>
        <div><span>04</span><h2>Networking</h2><p>Connect with the right people at the right time.</p></div>
      </section>

      <section className="closing" id="why-us">
        <p className="eyebrow">One platform. More possibility.</p>
        <h2>Make your next move<br /><em>your best one.</em></h2>
        <Link className="button button-dark" href="/book-demo">See how it works <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
