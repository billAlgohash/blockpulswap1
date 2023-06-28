// src/routes/+layout.ts
import { invalidate } from '$app/navigation'
const  PUBLIC_SUPABASE_URL = 'https://amvtkeyfaduowfkbviyl.supabase.co'
const  PUBLIC_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdnRrZXlmYWR1b3dma2J2aXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MDEzMTUsImV4cCI6MjAwMzE3NzMxNX0.n6XWDgimQY161SzrgcC9nSOzTAhMYHnstACz8nGtOVE'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth')

  const supabase = createSupabaseLoadClient({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return { supabase, session }
}