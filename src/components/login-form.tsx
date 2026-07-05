'use client'

import { useState } from 'react'
import { LoaderCircle } from 'lucide-react'
import { FcGoogle } from "react-icons/fc";

import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/oauth?next=/events`,
        },
      })

      if (error) throw error
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-xl font-semibold tracking-tight">Welcome</CardTitle>
          <CardDescription>Sign in to continue to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSocialLogin} className="space-y-4">
            {error && (
              <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            <Button
              type="submit"
              variant="outline"
              size="lg"
              className="h-11 w-full gap-3 font-normal"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
                  Signing in…
                </>
              ) : (
                <>
                  <FcGoogle className="size-5" />
                  Continue with Google
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
