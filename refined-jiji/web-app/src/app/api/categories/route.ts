import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Call actual backend API
    const backendUrl = process.env.API_URL || 'http://localhost:5000/api';

    const response = await fetch(`${backendUrl}/categories`);

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { message: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}