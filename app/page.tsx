import { AthleteDirectory } from '@/components/athlete-directory'
import { athletes } from '@/lib/athletes'

export default function Page() {
  return <main className="site-shell">
    <nav className="nav"><div className="brand"><span className="brand-mark">+</span> the<span>PORTAL</span></div><div className="nav-links"><a href="#discover">Discover athletes</a><a href="#about">For coaches</a><button>Sign in</button></div></nav>
    <section className="hero"><div className="eyebrow"><span className="live-dot" /> LIVE DEMO · RECRUITING NETWORK</div><h1>Find the next<br /><em>difference-maker.</em></h1><p>Explore verified athlete profiles, performance data, and the people behind the potential.</p></section>
    <section className="directory-section" id="discover"><div className="section-heading"><div><p className="eyebrow">ATHLETE DIRECTORY</p><h2>Built for the next level.</h2></div><span className="section-note">Every profile tells a story.</span></div><AthleteDirectory athletes={athletes} /></section>
    <footer id="about"><div className="brand"><span className="brand-mark">+</span> the<span>PORTAL</span></div><p>Education · Performance · Mentorship · Networking</p></footer>
  </main>
}
