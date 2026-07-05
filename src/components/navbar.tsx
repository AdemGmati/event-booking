import { createClient } from '@/lib/supabase/server'

import { NavbarClient } from './navbar-client'

export async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const email = user?.email ?? ''
  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ??
    (user?.user_metadata?.picture as string | undefined) ??
    null

  return <NavbarClient email={email} avatarUrl={avatarUrl} />
}
