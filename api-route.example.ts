// Copy this file to src/app/api/generate-password/route.ts in your Next.js app
import { NextResponse } from 'next/server';
import { generatePassword } from 'cosmic-auth';

export async function POST() {
  try {
    // Hardcoded options
    const password = await generatePassword({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true,
    });
    return NextResponse.json({ password });
  } catch (error) {
    console.error('Error generating password:', error);
    return NextResponse.json(
      { error: 'Failed to generate password' },
      { status: 500 }
    );
  }
} 