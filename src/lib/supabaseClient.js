// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const  SUPABSE_URL = 'https://amvtkeyfaduowfkbviyl.supabase.co'
const  SUPABASE_PUBLIC_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtdnRrZXlmYWR1b3dma2J2aXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2MDEzMTUsImV4cCI6MjAwMzE3NzMxNX0.n6XWDgimQY161SzrgcC9nSOzTAhMYHnstACz8nGtOVE'

export const supabase = createClient(SUPABSE_URL, SUPABASE_PUBLIC_KEY)
