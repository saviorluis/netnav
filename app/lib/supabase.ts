import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// In-memory storage for development when offline
let mockWaitlist: Array<{ email: string, created_at: string }> = [];

// For development/demo purposes, use a mock client if environment variables are not set
let supabaseClient: ReturnType<typeof createClient>

if (supabaseUrl && supabaseAnonKey) {
  try {
    // Use actual Supabase client if credentials are available
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
    console.log('Supabase client initialized successfully')
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error)
    // Fall back to mock client
    supabaseClient = createMockClient()
  }
} else {
  // Create a mock client for development/demo purposes
  console.warn('Supabase credentials not found. Using mock client.')
  supabaseClient = createMockClient()
}

// Create a mock Supabase client for development
function createMockClient() {
  return {
    from: (table: string) => ({
      insert: (rows: any) => {
        console.log(`Mock insert into ${table}:`, rows)
        
        if (table === 'waitlist') {
          mockWaitlist.push(...rows)
          console.log('Current mock waitlist:', mockWaitlist)
        }
        
        return Promise.resolve({ 
          data: rows, 
          error: null 
        })
      },
      select: () => {
        if (table === 'waitlist') {
          console.log('Returning mock waitlist:', mockWaitlist)
          return Promise.resolve({ data: mockWaitlist, error: null })
        }
        return Promise.resolve({ data: [], error: null })
      },
    }),
  } as any
}

export const supabase = supabaseClient
