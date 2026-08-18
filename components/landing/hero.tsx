import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-athlete.png"
          alt=""
          fill
          priority
          className="object-cover object-center opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-36">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wide text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            THE RECRUITING PLATFORM FOR ATHLETES
          </span>

          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Get seen. Get <span className="text-primary">recruited</span>. Power on.
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            thePORTAL puts college recruiting in your hands. Build a standout player card, share
            your stats and film, and connect directly with college coaches actively looking for
            athletes like you.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Build your player card
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#coaches"
              className="inline-flex items-center justify-center rounded-md border border-border bg-secondary/40 px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              I&apos;m a coach
            </Link>
          </div>

          <dl className="mt-14 grid max-w-md grid-cols-3 gap-6">
            {[
              { value: "50K+", label: "Athlete profiles" },
              { value: "1,200+", label: "Coaches active" },
              { value: "40+", label: "Sports covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="text-3xl font-bold text-foreground">{stat.value}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
