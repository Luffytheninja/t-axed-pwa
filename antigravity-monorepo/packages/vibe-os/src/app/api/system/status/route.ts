import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        serverTime: new Date().toISOString(),
        systemLoad: Math.floor(Math.random() * 15) + 5 + '%',
        vibeStatus: 'Synchronized',
        activeUsers: 1,
        location: 'Lagos, NG',
    });
}
