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

## Demo App

The demo app shows how to use the package in a Next.js application. It features a beautiful signup form with automatic password generation.

### Key Features
- Automatic password generation on first focus
- Manual password generation with refresh button
- Password suggestion with "Use this" option
- Form validation and success feedback
- Modern, responsive UI with Tailwind CSS

### Implementation

The demo consists of two main files:

1. Frontend ([`src/app/page.tsx`](cosmic-auth-demo/cosmic-auth-demo/src/app/page.tsx)):
   - Signup form with name, email, DOB, gender, and password fields
   - Password field with auto-generation on first focus
   - Refresh icon button for manual generation
   - Password suggestion display
   - Form submission handling

2. Backend ([`src/app/api/generate/route.ts`](cosmic-auth-demo/cosmic-auth-demo/src/app/api/generate/route.ts)):
   - API route for password generation
   - Default password options
   - Error handling
   - Response formatting

### How It Works

1. **First Focus Generation**:
   ```typescript
   const handlePasswordFocus = () => {
     if (!hasGenerated.current && !formData.password) {
       generatePassword();
     }
   };
   ```

2. **Manual Generation**:
   ```typescript
   <button
     type="button"
     onClick={generatePassword}
     className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
   >
     <ArrowPathIcon className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
   </button>
   ```

3. **Password Suggestion**:
   ```typescript
   {suggestedPassword && (
     <div className="mt-2 p-2 bg-gray-50 rounded-md">
       <p className="text-sm text-black">Suggested password:</p>
       <div className="flex items-center justify-between gap-2">
         <code className="text-sm font-mono">{suggestedPassword}</code>
         <button onClick={() => setFormData({ ...formData, password: suggestedPassword })}>
           Use this
         </button>
       </div>
     </div>
   )}
   ```

### Running the Demo

1. Clone the repository
2. Navigate to the demo directory:
   ```bash
   cd cosmic-auth-demo/cosmic-auth-demo
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file with your Orbitport credentials
5. Start the development server:
   ```bash
   npm run dev
   ```

The demo will be available at `http://localhost:3000`.

## License

MIT 