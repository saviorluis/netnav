import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Use PrismaClient as a singleton
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, source } = await request.json();

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      // Update existing subscriber with new information
      await prisma.subscriber.update({
        where: { email },
        data: {
          lastActive: new Date(),
          // Only update name if provided and different
          ...(firstName && lastName && `${firstName} ${lastName}` !== existingSubscriber.name 
            ? { name: `${firstName} ${lastName}` } 
            : {}),
          // Track interaction source
          interactions: {
            create: {
              source: source || 'api',
              action: 'subscription_renewal',
            },
          },
        },
      });

      return NextResponse.json({
        message: 'Subscription updated successfully',
        success: true,
      });
    }

    // Create new subscriber
    const newSubscriber = await prisma.subscriber.create({
      data: {
        email,
        name: firstName && lastName ? `${firstName} ${lastName}` : '',
        status: 'active',
        subscribedAt: new Date(),
        lastActive: new Date(),
        source: source || 'landing_page',
        interactions: {
          create: {
            source: source || 'api',
            action: 'initial_subscription',
          },
        },
      },
    });

    return NextResponse.json({
      message: 'Subscription successful',
      success: true,
      id: newSubscriber.id,
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    );
  }
} 