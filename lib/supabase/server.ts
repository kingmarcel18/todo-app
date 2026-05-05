import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = 'https://papavxvotfzxrcmrsbaf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhcGF2eHZvdGZ6eHJjbXJzYmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5MjI5NDUsImV4cCI6MjA5MzQ5ODk0NX0.jfbI0opYEjpaNjqQuzM9bmFhwLMx8ysEXYHHHkv__Qo'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {}
      },
    },
  })
}