import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const zipCode = searchParams.get('zipCode');

  if (!zipCode) {
    return NextResponse.json(
      { message: 'Zip code is required' },
      { status: 400 }
    );
  }

  if (!/^\d{5}$/.test(zipCode)) {
    return NextResponse.json(
      { message: 'Invalid zip code format' },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENCAGE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: 'Geocoding service not configured' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&countrycode=us&limit=1&key=${apiKey}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Geocoding service error');
    }

    if (data.results.length === 0) {
      return NextResponse.json(
        { message: 'Location not found' },
        { status: 404 }
      );
    }

    const { lat, lng } = data.results[0].geometry;

    return NextResponse.json({ lat, lng });
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { message: 'Failed to geocode location' },
      { status: 500 }
    );
  }
} 