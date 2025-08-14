// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://vqvpzdbbykiptgagrhwb.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdnB6ZGJieWtpcHRnYWdyaHdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUxOTg3NTEsImV4cCI6MjA3MDc3NDc1MX0.eL2tko9fTm-7U_ys8d7Di8obIuhP2ZicQc6_QRJ0EQY"

export const supabase = createClient(supabaseUrl, supabaseKey)
