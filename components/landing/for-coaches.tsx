import Link from "next/link"
import { Search, ShieldCheck, MessageSquare, ArrowRight } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Precision search",
    description: "Filter by position, class year, region, GPA, and verified metrics to build your board fast.",
  },
  {
    icon: ShieldCheck,
    title: "Verified profiles",
    description: "Stats and academics are structured and consistent, so evaluation is apples to apples.",
  },
  {
    icon: MessageSquare,
    title: "Direct outreach",
    description: "Message prospects and manage your recruiting pipeline without leaving the platform.",
  },
]

export function ForCoaches() {
  return (
    <section id="coaches" className="border-t border-border/60 py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold tracking-widest text-primary">FOR COACHES</span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Find the right athletes, faster
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Stop digging through spreadsheets and DMs. thePORTAL gives your program a single,
            searchable pool of motivated, evaluation-ready athletes.
          </p>
          <Link
            href="/signup?role=coach"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Create a coach account
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4">
          {features.map((f) => (
            <div key={f.title} className="flex gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
