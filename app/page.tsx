import { SiteNav } from "@/components/landing/site-nav"
import { Hero } from "@/components/landing/hero"
import { PowerOn } from "@/components/landing/power-on"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ForCoaches } from "@/components/landing/for-coaches"
import { CtaFooter } from "@/components/landing/cta-footer"

export default function Page() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteNav />
      <main>
        <Hero />
        <PowerOn />
        <HowItWorks />
        <ForCoaches />
        <CtaFooter />
      </main>
    </div>
  )
}
