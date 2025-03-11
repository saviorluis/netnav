import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');

  if (!lat || !lng) {
    return NextResponse.json(
      { message: 'Latitude and longitude are required' },
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
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&countrycode=us&limit=1&key=${apiKey}`
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

    const components = data.results[0].components;
    const zipCode = components.postcode;

    if (!zipCode) {
      return NextResponse.json(
        { message: 'Zip code not found for this location' },
        { status: 404 }
      );
    }

    return NextResponse.json({ zipCode });
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return NextResponse.json(
      { message: 'Failed to reverse geocode location' },
      { status: 500 }
    );
  }
} 