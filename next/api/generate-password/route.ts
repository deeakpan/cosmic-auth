import { NextResponse } from 'next/server';
import { generatePassword } from 'cosmic-auth';

export async function POST() {
  try {
    const password = await generatePassword({
      length: 16,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: true
    });

    return NextResponse.json({ password });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate password' },
      { status: 500 }
    );
  }
} 