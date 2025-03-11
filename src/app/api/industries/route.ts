import { NextResponse } from 'next/server';

// Predefined list of industries
const INDUSTRIES = [
  { id: 'tech', name: 'Technology' },
  { id: 'finance', name: 'Finance' },
  { id: 'healthcare', name: 'Healthcare' },
  { id: 'education', name: 'Education' },
  { id: 'retail', name: 'Retail' },
  { id: 'manufacturing', name: 'Manufacturing' },
  { id: 'realestate', name: 'Real Estate' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'legal', name: 'Legal' },
  { id: 'hospitality', name: 'Hospitality' },
  { id: 'consulting', name: 'Consulting' },
  { id: 'nonprofit', name: 'Non-Profit' },
  { id: 'construction', name: 'Construction' },
  { id: 'transportation', name: 'Transportation' },
  { id: 'agriculture', name: 'Agriculture' },
  { id: 'energy', name: 'Energy' },
  { id: 'media', name: 'Media & Entertainment' },
  { id: 'telecom', name: 'Telecommunications' },
  { id: 'insurance', name: 'Insurance' },
  { id: 'government', name: 'Government' }
];

export async function GET() {
  try {
    // Return the predefined list of industries
    return NextResponse.json(INDUSTRIES);
  } catch (error) {
    console.error('Error fetching industries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch industries' },
      { status: 500 }
    );
  }
} 