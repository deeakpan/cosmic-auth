# Cosmic Auth

A Node.js package that generates passwords using truly random numbers from the cTRNG API.

## Installation

```bash
npm install cosmic-auth
```

## Environment Variables

Create a `.env` file in your project root with the following variables:

```env
# Auth0 credentials for getting access token
ORBITPORT_API_URL=https://dev-1usujmbby8627ni8.us.auth0.com
ORBITPORT_AUTH_URL=https://op.spacecomputer.io
ORBITPORT_CLIENT_ID=your-client-id
ORBITPORT_CLIENT_SECRET=your-client-secret
```

## Getting an Access Token

Before using the package, you need to get an access token from Auth0. Here's how:

1. Make sure your `.env` file is set up with the correct credentials
2. Run the following script to get your access token:

```javascript
require('dotenv').config();
const fetch = require('node-fetch');

(async () => {
  try {
    const url = `${process.env.ORBITPORT_API_URL}/oauth/token`;
    const body = {
      client_id: process.env.ORBITPORT_CLIENT_ID,
      client_secret: process.env.ORBITPORT_CLIENT_SECRET,
      audience: `${process.env.ORBITPORT_AUTH_URL}/api`,
      grant_type: "client_credentials"
    };
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
})();
```

The response will include your access token:
```json
{
  "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlRRaDYtdGZhTmxhNV9KeGtDeVNKZyJ9...",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

## Usage

```typescript
import { generatePassword } from 'cosmic-auth';

// Generate a password with default options
const password = await generatePassword();

// Or with custom options
const customPassword = await generatePassword({
  length: 16,
  includeUppercase: true,
  includeNumbers: true,
  includeSpecialChars: true
});
```

## API

### generatePassword(options?: PasswordOptions): Promise<string>

Generates a random password using the cTRNG API.

#### Options

- `length` (number): Length of the password (default: 12)
- `includeUppercase` (boolean): Include uppercase letters (default: true)
- `includeNumbers` (boolean): Include numbers (default: true)
- `includeSpecialChars` (boolean): Include special characters (default: true)

## License

MIT 