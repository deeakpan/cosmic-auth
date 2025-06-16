import { NextResponse } from 'next/server';
import { generatePassword } from 'cosmic-auth';

// Default password options
const DEFAULT_OPTIONS = {
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: true
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Merge user options with defaults
    const options = {
      ...DEFAULT_OPTIONS,
      ...body
    };

    const password = await generatePassword(options);

    return NextResponse.json({ password });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate password' },
      { status: 500 }
    );
  }
} 