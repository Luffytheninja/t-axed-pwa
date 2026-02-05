import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, password, phone, location } = body;

    // Call actual backend API
    const backendUrl = process.env.API_URL || 'http://localhost:5000/api';

    const response = await fetch(`${backendUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        phone: phone || undefined,
        location: location || undefined,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json(data);
    } else {
      return NextResponse.json(data, { status: response.status });
    }
  } catch (error) {
    console.error('Register API error:', error);
    return NextResponse.json(
      { message: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}