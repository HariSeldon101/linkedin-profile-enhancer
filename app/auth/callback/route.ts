import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Successfully authenticated, create/update user profile
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if user exists in our users table
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single()

        if (!existingUser) {
          // Create new user record
          await supabase.from('users').insert({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name || user.user_metadata?.name,
            avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture,
            linkedin_id: user.user_metadata?.sub,
            subscription_tier: 'free'
          })

          // Create initial empty profile
          await supabase.from('profiles').insert({
            user_id: user.id,
            headline: user.user_metadata?.headline,
            linkedin_data: user.user_metadata,
            version: 1
          })
        }
      }

      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-error`)
}