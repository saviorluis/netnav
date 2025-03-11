import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // In a real application, you would store this in a database
    // Here's an example of how you might do it with Prisma
    /*
    await prisma.waitlist.create({
      data: {
        email,
        joinedAt: new Date(),
      },
    });
    */

    // For now, just log it (in a real app, you would save to a database)
    console.log(`New waitlist signup: ${email}`);

    return NextResponse.json({ 
      success: true,
      message: 'Thank you for joining our waitlist!'
    });

  } catch (error) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { message: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
} 