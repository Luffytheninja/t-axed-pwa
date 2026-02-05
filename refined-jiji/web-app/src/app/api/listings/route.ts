import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Call actual backend API
    const backendUrl = process.env.API_URL || 'http://localhost:5000/api';
    const url = new URL(request.url);
    const queryParams = url.searchParams;

    // Build query string for filters
    const queryString = queryParams.toString();
    const apiUrl = queryString
      ? `${backendUrl}/listings?${queryString}`
      : `${backendUrl}/listings`;

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': request.headers.get('authorization') || '',
      },
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Listings API error:', error);
    return NextResponse.json(
      { message: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Call actual backend API
    const backendUrl = process.env.API_URL || 'http://localhost:5000/api';

    const response = await fetch(`${backendUrl}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': request.headers.get('authorization') || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Create listing API error:', error);
    return NextResponse.json(
      { message: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}