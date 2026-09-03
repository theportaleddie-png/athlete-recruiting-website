export type Athlete = {
  slug: string
  name: string
  initials: string
  position: string
  sport: string
  classYear: number
  school: string
  location: string
  height: string
  weight: string
  gpa: string
  verified: boolean
  summary: string
  stats: { label: string; value: string }[]
  highlights: string[]
}

export const athletes: Athlete[] = [
  { slug: 'maya-thompson', name: 'Maya Thompson', initials: 'MT', position: 'Point Guard', sport: 'Basketball', classYear: 2026, school: 'Westlake Academy', location: 'Austin, TX', height: '5\'8"', weight: '145 lb', gpa: '3.9', verified: true, summary: 'Floor general with a high motor, elite court vision, and a proven record of elevating every possession.', stats: [{ label: 'PPG', value: '18.6' }, { label: 'APG', value: '7.2' }, { label: 'SPG', value: '3.1' }], highlights: ['All-State First Team', 'Team captain', '3× Academic Honor Roll'] },
  { slug: 'jordan-williams', name: 'Jordan Williams', initials: 'JW', position: 'Wide Receiver', sport: 'Football', classYear: 2026, school: 'Northview High', location: 'Atlanta, GA', height: '6\'1"', weight: '185 lb', gpa: '3.7', verified: true, summary: 'Explosive route runner who creates separation and brings reliable hands to every down.', stats: [{ label: 'REC', value: '64' }, { label: 'YDS', value: '1,142' }, { label: 'TD', value: '14' }], highlights: ['Region Offensive MVP', '4.45s 40-yard dash', 'National Honor Society'] },
  { slug: 'sophia-martinez', name: 'Sophia Martinez', initials: 'SM', position: 'Center Midfield', sport: 'Soccer', classYear: 2027, school: 'Canyon Ridge Prep', location: 'Phoenix, AZ', height: '5\'6"', weight: '132 lb', gpa: '4.0', verified: true, summary: 'Creative two-way midfielder who sees the game early and consistently turns pressure into opportunity.', stats: [{ label: 'GOALS', value: '11' }, { label: 'ASSISTS', value: '16' }, { label: 'MIN', value: '1,680' }], highlights: ['State semifinalist', 'Club captain', 'AP Scholar'] },
  { slug: 'ethan-cole', name: 'Ethan Cole', initials: 'EC', position: 'Shortstop', sport: 'Baseball', classYear: 2026, school: 'Pinecrest School', location: 'Charlotte, NC', height: '5\'11"', weight: '170 lb', gpa: '3.8', verified: false, summary: 'Complete middle infielder with quick hands, a confident approach, and a competitive edge.', stats: [{ label: 'AVG', value: '.387' }, { label: 'HR', value: '8' }, { label: 'RBI', value: '42' }], highlights: ['All-Conference', 'Defensive player of year', 'Honor student'] },
]

export function getAthlete(slug: string) {
  return athletes.find((athlete) => athlete.slug === slug)
}
