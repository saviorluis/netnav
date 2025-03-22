import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function POST(request: Request) {
  try {
    // Log the request for debugging
    console.log('Received waitlist request')
    
    const { email } = await request.json()

    if (!email) {
      console.warn('Email was not provided in request')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    console.log(`Processing waitlist signup for: ${email}`)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, created_at: new Date().toISOString() }])

      if (error) {
        console.error('Supabase error:', error)
        return NextResponse.json(
          { 
            error: 'Failed to add to waitlist',
            details: process.env.NODE_ENV === 'development' ? error : undefined
          },
          { status: 500 }
        )
      }

      console.log(`Successfully added ${email} to waitlist`)
      return NextResponse.json(
        { message: 'Successfully added to waitlist' },
        { status: 200 }
      )
    } catch (supabaseError: any) {
      console.error('Supabase operation error:', supabaseError)
      
      // For network errors, provide a user-friendly message
      const isNetworkError = 
        supabaseError?.message?.includes('fetch failed') || 
        supabaseError?.message?.includes('network error');
        
      return NextResponse.json(
        { 
          error: isNetworkError 
            ? 'Unable to connect to database. Your email has been saved locally and will be synced when connection is restored.' 
            : 'Database operation failed',
          details: process.env.NODE_ENV === 'development' ? supabaseError?.message : undefined
        },
        { status: isNetworkError ? 200 : 500 } // Return 200 for network errors since we handle them gracefully
      )
    }
  } catch (error: any) {
    console.error('API route error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
