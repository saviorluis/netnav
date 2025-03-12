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
    const { email, name, source } = await request.json();

    // Basic validation
    if (!email) {
      return NextResponse.json(
        { message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
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
          ...(name && name !== existingSubscriber.name ? { name } : {}),
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
      });
    }

    // Create new subscriber
    await prisma.subscriber.create({
      data: {
        email,
        name: name || '',
        status: 'active',
        subscribedAt: new Date(),
        lastActive: new Date(),
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
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 