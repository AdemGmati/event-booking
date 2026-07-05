import { redirect } from 'next/navigation'

import { EventCard } from '@/components/event-card'
import { createClient } from '@/lib/supabase/server'

export type Event = {
  id: string
  title: string
  description: string | null
  category: string | null
  location: string | null
  start_date: string
  end_date: string
  cover_image: string | null
  created_at: string | null
}

export default async function EventsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('*')
    .order('start_date', { ascending: true })

  if (eventsError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="font-medium text-destructive">Could not load events</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Please try again in a moment.
        </p>
      </div>
    )
  }

  const eventList = (events ?? []) as Event[]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Events</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Browse upcoming events and tap a card to see full details.
        </p>
      </div>

      {eventList.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-card p-12 text-center">
          <p className="font-medium">No events yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Check back soon for new events.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventList.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
