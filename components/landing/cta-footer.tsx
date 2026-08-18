import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaFooter() {
  return (
    <>
      <section className="border-t border-border/60 py-24 md:py-32">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Your recruiting story starts today
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Join thousands of athletes taking control of their futures. Build your player card free
            and put yourself in front of coaches who are looking right now.
          </p>
          <Link
            href="/signup"
            className="mt-9 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get started free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/60 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
              P
            </span>
            <span className="font-bold tracking-tight">
              the<span className="text-primary">PORTAL</span>
            </span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <Link href="#how" className="transition-colors hover:text-foreground">
              How it works
            </Link>
            <Link href="#power-on" className="transition-colors hover:text-foreground">
              POWER ON
            </Link>
            <Link href="#coaches" className="transition-colors hover:text-foreground">
              For coaches
            </Link>
            <Link href="/login" className="transition-colors hover:text-foreground">
              Log in
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} thePORTAL
          </p>
        </div>
      </footer>
    </>
  )
}
