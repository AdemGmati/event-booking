import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'


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

export function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.id}`} className="group block h-full">
      <Card className="h-full gap-0 py-0 transition-all hover:shadow-md hover:ring-foreground/15">
        <div className="relative aspect-16/10 overflow-hidden bg-muted">
          {event.cover_image ? (
            <Image
              src={event.cover_image}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No cover image
            </div>
          )}
        </div>

        <CardHeader className="gap-3 pb-4">
          {event.category ? (
            <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {event.category}
            </span>
          ) : null}
          <CardTitle className="line-clamp-2 text-lg leading-snug">
            {event.title}
          </CardTitle>
          {event.description ? (
            <CardDescription className="line-clamp-3 leading-relaxed">
              {event.description}
            </CardDescription>
          ) : null}
        </CardHeader>

        <CardContent className="mt-auto pb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5 shrink-0" />
            <span>{event.start_date}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
