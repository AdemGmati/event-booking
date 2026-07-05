'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, User, X } from 'lucide-react'
import { useState } from 'react'

import { LogoutButton } from '@/components/logout-button'

const links = [
  { href: '/events', label: 'Events' },
  { href: '/bookings', label: 'My Bookings' },
]

type NavbarProps = {
  email: string
  avatarUrl: string | null
}

export function NavbarClient({ email, avatarUrl }: NavbarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/events" className="text-xl font-bold">
          EventHub
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? 'font-semibold' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={email}
              width={36}
              height={36}
              className="rounded-full"
            />
          ) : (
            <User className="size-8 rounded-full border p-1" />
          )}

          <span className="text-sm">{email}</span>

          <LogoutButton />
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="space-y-3 border-t p-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 pt-2">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={email}
                width={36}
                height={36}
                className="rounded-full"
              />
            ) : (
              <User className="size-8 rounded-full border p-1" />
            )}

            <span className="text-sm">{email}</span>
          </div>

          <LogoutButton/>
        </div>
      )}
    </header>
  )
}