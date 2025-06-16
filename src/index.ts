import 'dotenv/config';
import fetch from 'node-fetch';

interface PasswordOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
}

async function getAccessToken(): Promise<string> {
  const authUrl = process.env.ORBITPORT_API_URL;
  const clientId = process.env.ORBITPORT_CLIENT_ID;
  const clientSecret = process.env.ORBITPORT_CLIENT_SECRET;

  console.log('Making request to:', `${authUrl}/oauth/token`);
  console.log('With body:', {
    client_id: clientId,
    client_secret: clientSecret,
    audience: 'https://op.spacecomputer.io/api',
    grant_type: 'client_credentials',
  });

  if (!authUrl || !clientId || !clientSecret) {
    throw new Error('Missing Orbitport credentials');
  }

  const response = await fetch(`${authUrl}/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      audience: 'https://op.spacecomputer.io/api',
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Response not OK:', response.status, errorText);
    throw new Error('Failed to get access token');
  }

  const data = await response.json();
  return data.access_token;
}

export async function generatePassword(options: PasswordOptions = {}): Promise<string> {
  const {
    length = 16,
    includeUppercase = true,
    includeLowercase = true,
    includeNumbers = true,
    includeSymbols = true,
  } = options;

  const token = await getAccessToken();
  const response = await fetch('https://op.spacecomputer.io/api/v1/services/trng', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Random fetch not OK:', response.status, errorText);
    throw new Error('Failed to fetch random data from Orbitport cTRNG API');
  }

  const data = await response.json();
  const randomBytes = Buffer.from(data.data, 'hex');
  
  let chars = '';
  if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers) chars += '0123456789';
  if (includeSymbols) chars += '!@#$%^&*_+-=[]{}|;:<>?';
  
  if (chars.length === 0) {
    throw new Error('At least one character type must be enabled');
  }

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % chars.length;
    password += chars[randomIndex];
  }

  return password;
} 