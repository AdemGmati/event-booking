import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export default async function BookingsPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getClaims()
  if (error || !data?.claims) {
    redirect('/auth/login')
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">My Bookings</h1>
      <p className="mt-2 text-muted-foreground">
        Your booked events will appear here.
      </p>
    </div>
  )
}
