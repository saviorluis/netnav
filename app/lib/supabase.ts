import { createClient } from '@supabase/supabase-js'

// Get Supabase URL and key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// In-memory storage for development
let mockWaitlist: Array<{ email: string, created_at: string }> = [];

// For development, use a mock client that works offline
// In production, try to use the real Supabase client
let supabaseClient: any;

// Force mock in development to avoid connection issues
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  console.log('🧪 Development mode: Using offline mock Supabase client');
  supabaseClient = createMockClient();
} else if (supabaseUrl && supabaseAnonKey) {
  try {
    console.log('🔌 Production mode: Connecting to Supabase');
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('❌ Failed to initialize Supabase client:', error);
    supabaseClient = createMockClient();
  }
} else {
  console.warn('⚠️ Supabase credentials not found. Using mock client.');
  supabaseClient = createMockClient();
}

// Create a mock Supabase client that works offline
function createMockClient() {
  console.log('📋 Creating mock Supabase client');
  return {
    from: (table: string) => ({
      insert: (rows: any) => {
        console.log(`✅ Mock insert into ${table}:`, rows);
        
        if (table === 'waitlist') {
          mockWaitlist.push(...rows);
          console.log('📬 Current mock waitlist:', mockWaitlist);
        }
        
        return Promise.resolve({ 
          data: rows, 
          error: null 
        });
      },
      select: () => {
        if (table === 'waitlist') {
          console.log('📋 Returning mock waitlist:', mockWaitlist);
          return Promise.resolve({ data: mockWaitlist, error: null });
        }
        return Promise.resolve({ data: [], error: null });
      },
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
    auth: {
      signIn: () => Promise.resolve({ data: null, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      onAuthStateChange: () => ({ data: null, unsubscribe: () => {} }),
    },
  };
}

export const supabase = supabaseClient;
