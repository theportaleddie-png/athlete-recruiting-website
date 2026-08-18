import Link from "next/link"

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" aria-label="thePORTAL home">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            P
          </span>
          <span className="text-lg font-bold tracking-tight">
            the<span className="text-primary">PORTAL</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="#how" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            How it works
          </Link>
          <Link href="#power-on" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            POWER ON
          </Link>
          <Link href="#coaches" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            For coaches
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  )
}
