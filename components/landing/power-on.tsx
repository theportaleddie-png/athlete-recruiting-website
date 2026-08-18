import { GraduationCap, Zap, Users, Network } from "lucide-react"

const pillars = [
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Academic profiles that showcase GPA, test readiness, and eligibility so coaches see the full student-athlete.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Verified stats, combine metrics, and highlight film that let your on-field results speak for themselves.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description:
      "Guidance from people who have been through recruiting, helping you make the right moves at the right time.",
  },
  {
    icon: Network,
    title: "Networking",
    description:
      "Direct lines to college programs and a community that opens doors you did not know existed.",
  },
]

export function PowerOn() {
  return (
    <section id="power-on" className="border-t border-border/60 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-widest text-primary">POWER ON</span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Four pillars behind every athlete we lift
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Recruiting is more than stats. thePORTAL is built on the four things that actually move
            an athlete&apos;s career forward.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <pillar.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
