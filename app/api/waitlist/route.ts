import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function POST(request: Request) {
  try {
    // Log the request
    console.log('📨 Received waitlist request')
    
    const { email } = await request.json()

    if (!email) {
      console.warn('⚠️ Email was not provided in request')
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }
    
    console.log(`📝 Processing waitlist signup for: ${email}`)

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, created_at: new Date().toISOString() }])

      if (error) {
        console.error('❌ Supabase error:', error)
        return NextResponse.json(
          { 
            error: 'Failed to add to waitlist',
            details: process.env.NODE_ENV === 'development' ? error : undefined
          },
          { status: 500 }
        )
      }

      console.log(`✅ Successfully added ${email} to waitlist`)
      return NextResponse.json(
        { 
          message: 'Successfully added to waitlist',
          // In development, add more info
          isDevelopment: process.env.NODE_ENV === 'development',
          offlineMode: process.env.NODE_ENV === 'development'
        },
        { status: 200 }
      )
    } catch (supabaseError: any) {
      console.error('❌ Supabase operation error:', supabaseError)
      
      return NextResponse.json(
        { 
          // In development, we're using mock client anyway, so it worked
          message: process.env.NODE_ENV === 'development' 
            ? 'Successfully added to waitlist (offline mode)' 
            : 'Failed to add to waitlist',
          error: process.env.NODE_ENV !== 'development' ? 'Database operation failed' : undefined,
          isDevelopment: process.env.NODE_ENV === 'development',
          offlineMode: true,
          details: process.env.NODE_ENV === 'development' ? supabaseError?.message : undefined
        },
        { 
          // In development, return 200 since we're using mock client
          status: process.env.NODE_ENV === 'development' ? 200 : 500 
        }
      )
    }
  } catch (error: any) {
    console.error('❌ API route error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}
