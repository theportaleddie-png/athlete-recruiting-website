import Link from 'next/link'

export function SiteNav() {
  return <header className="site-nav"><Link className="brand" href="/">the<span>PORTAL</span></Link><nav aria-label="Main navigation"><Link href="/player-card">Athletes</Link><Link href="/book-demo">Coaches</Link><Link href="/trainers">Trainers</Link><a href="#brands">Brands</a><a href="#about">About</a><Link className="nav-cta" href="/player-card">Build your Player Card <span aria-hidden="true">↗</span></Link></nav></header>
}
export function SiteFooter() { return <footer className="site-footer"><Link className="brand" href="/">the<span>PORTAL</span></Link><p>Digital infrastructure for athletes going somewhere.</p><div><Link href="/player-card">Build your Player Card</Link><Link href="/trainers">Explore Trainers</Link><Link href="/book-demo">Request a Demo</Link></div></footer> }
