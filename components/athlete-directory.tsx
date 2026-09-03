'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { Athlete } from '@/lib/athletes'

export function AthleteDirectory({ athletes }: { athletes: Athlete[] }) {
  const [query, setQuery] = useState('')
  const [sport, setSport] = useState('All sports')
  const sports = ['All sports', ...Array.from(new Set(athletes.map((athlete) => athlete.sport)))]
  const filtered = useMemo(() => athletes.filter((athlete) => {
    const text = `${athlete.name} ${athlete.position} ${athlete.school}`.toLowerCase()
    return text.includes(query.toLowerCase()) && (sport === 'All sports' || athlete.sport === sport)
  }), [athletes, query, sport])

  return <>
    <div className="directory-tools">
      <label className="search-field"><span className="sr-only">Search athletes</span><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, position, or school" /></label>
      <label className="select-field"><span className="sr-only">Filter by sport</span><select value={sport} onChange={(event) => setSport(event.target.value)}>{sports.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    <div className="directory-meta"><span>{filtered.length} athletes discoverable</span><span>Updated for the 2026 recruiting cycle</span></div>
    <div className="athlete-grid">{filtered.map((athlete) => <Link className="athlete-card" href={`/athlete/${athlete.slug}`} key={athlete.slug}>
      <div className="card-top"><div className="avatar">{athlete.initials}</div><span className={athlete.verified ? 'verified' : 'unverified'}>{athlete.verified ? '✓ Verified' : 'Profile'}</span></div>
      <div><h2>{athlete.name}</h2><p className="position">{athlete.position} <span>·</span> {athlete.sport}</p></div>
      <div className="card-details"><span>{athlete.school}</span><span>{athlete.classYear} class</span></div>
      <div className="card-footer"><span>{athlete.location}</span><span className="view-profile">View profile →</span></div>
    </Link>)}</div>
    {filtered.length === 0 && <div className="empty-state"><strong>No athletes found</strong><span>Try a different name, sport, or school.</span></div>}
  </>
}
