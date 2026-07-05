import Image from 'next/image'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react'


import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/server'
import { buttonVariants } from '@/components/ui/button'


type EventDetailPageProps = {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  const { data: event, error: eventError } = await supabase
    .from('events')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (eventError) {
    return (
      <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
        <p className="font-medium text-destructive">Could not load event</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Please try again in a moment.
        </p>
      </div>
    )
  }

  if (!event) {
    notFound()
  }

  const eventData = event as Event

  return (
    <article className="mx-auto max-w-4xl space-y-8">
      <Link
        href="/events"
        className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), '-ml-2 w-fit')}
      >
        <ArrowLeft className="size-4" />
        Back to events
      </Link>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="relative aspect-21/9 bg-muted">
          {eventData.cover_image ? (
            <Image
              src={eventData.cover_image}
              alt={eventData.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No cover image
            </div>
          )}
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="space-y-4">
            {eventData.category ? (
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {eventData.category}
              </span>
            ) : null}

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {eventData.title}
            </h1>

            <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-6">
              <div className="flex items-start gap-2">
                <CalendarDays className="mt-0.5 size-4 shrink-0" />
                <span>
                  {eventData.start_date} - {eventData.end_date}
                </span>
              </div>

              {eventData.location ? (
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  <span>{eventData.location}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
              About this event
            </h2>
            <p className="mt-3 text-base leading-relaxed text-foreground/90">
              {eventData.description ?? 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
