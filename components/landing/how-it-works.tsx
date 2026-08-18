const steps = [
  {
    step: "01",
    title: "Build your player card",
    description:
      "Add your stats, academics, highlight film, and story in minutes. Your card becomes your recruiting home base.",
  },
  {
    step: "02",
    title: "Get discovered",
    description:
      "College coaches search and filter by position, region, class year, and metrics. A strong card puts you in front of them.",
  },
  {
    step: "03",
    title: "Connect and commit",
    description:
      "Message coaches, respond to interest, and track every conversation from first contact to offer.",
  },
]

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-border/60 bg-card/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold tracking-widest text-primary">HOW IT WORKS</span>
          <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            From unseen to recruited in three steps
          </h2>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step} className="relative">
              <span className="font-mono text-5xl font-bold text-primary/30">{s.step}</span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
