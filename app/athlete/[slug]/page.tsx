import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAthlete, athletes } from '@/lib/athletes'

export function generateStaticParams() { return athletes.map(({ slug }) => ({ slug })) }

export default async function AthleteProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const athlete = getAthlete(slug)
  if (!athlete) notFound()
  return <main className="profile-shell">
    <nav className="nav"><Link href="/" className="brand"><span className="brand-mark">+</span> the<span>PORTAL</span></Link><Link href="/" className="back-link">← Back to directory</Link></nav>
    <div className="profile-wrap"><div className="profile-crumb">ATHLETE PROFILE <span>/</span> {athlete.sport.toUpperCase()}</div>
      <section className="profile-hero"><div className="profile-avatar">{athlete.initials}</div><div className="profile-heading"><div className="profile-status">{athlete.verified ? '✓ VERIFIED PROFILE' : 'ATHLETE PROFILE'}</div><h1>{athlete.name}</h1><p>{athlete.position} <span>·</span> Class of {athlete.classYear}</p><div className="profile-location">⌖ {athlete.school} <span>·</span> {athlete.location}</div></div><button className="contact-button">Contact athlete</button></section>
      <section className="profile-grid"><div className="main-column"><div className="panel intro"><p className="eyebrow">ABOUT {athlete.name.split(' ')[0].toUpperCase()}</p><p>{athlete.summary}</p></div><div className="panel"><div className="panel-heading"><p className="eyebrow">PERFORMANCE SNAPSHOT</p><span>2025–26 season</span></div><div className="stat-grid">{athlete.stats.map((stat) => <div className="stat" key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div></div><aside className="side-column"><div className="panel details"><p className="eyebrow">MEASURABLES</p><div><span>Height</span><strong>{athlete.height}</strong></div><div><span>Weight</span><strong>{athlete.weight}</strong></div><div><span>GPA</span><strong>{athlete.gpa}</strong></div></div><div className="panel highlights"><p className="eyebrow">HIGHLIGHTS</p>{athlete.highlights.map((highlight) => <p key={highlight}>✦ {highlight}</p>)}</div></aside></section>
    </div>
  </main>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const athlete = getAthlete(slug)
  return { title: athlete ? `${athlete.name} · thePORTAL` : 'Athlete not found', description: athlete?.summary }
}
