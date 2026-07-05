import type { ReactNode } from 'react'

import { Navbar } from '@/components/navbar'

type EventsLayoutProps = {
  children: ReactNode
}

export default function EventsLayout({ children }: EventsLayoutProps) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100svh-4rem)] bg-muted/30">
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </section>
      </main>
    </>
  )
}