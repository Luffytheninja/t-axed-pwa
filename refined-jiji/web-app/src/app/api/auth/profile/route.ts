import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '../../../lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Call actual backend API
    const backendUrl = process.env.API_URL || 'http://localhost:5000/api';

    const response = await fetch(`${backendUrl}/auth/profile`, {
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
    console.error('Profile API error:', error);
    return NextResponse.json(
      { message: 'Network error. Please try again.' },
      { status: 500 }
    );
  }
}