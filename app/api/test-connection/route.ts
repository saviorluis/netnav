import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test if we can reach a public API
    console.log('Testing connection to a public API...')
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await response.json()
    
    // Try to reach Supabase directly
    console.log('Testing connection to Supabase...')
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const pingResponse = await fetch(`${supabaseUrl}/rest/v1/?apikey=${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`)
    
    return NextResponse.json({
      status: 'success',
      publicApiWorking: true,
      publicApiData: data,
      supabaseApiWorking: pingResponse.ok,
      supabaseStatus: pingResponse.status,
      supabaseStatusText: pingResponse.statusText
    })
  } catch (error: any) {
    console.error('Connection test error:', error)
    return NextResponse.json({
      status: 'error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    })
  }
} 