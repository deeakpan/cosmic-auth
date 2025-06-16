const fs = require('fs');
const path = require('path');

// Get the path to the user's Next.js app
const appDir = process.cwd();

// Create the API directory if it doesn't exist
const apiDir = path.join(appDir, 'src', 'app', 'api', 'generate-password');
if (!fs.existsSync(apiDir)) {
  fs.mkdirSync(apiDir, { recursive: true });
}

// Copy the API route file
const sourceRoute = path.join(__dirname, '..', 'next', 'api', 'generate-password', 'route.ts');
const targetRoute = path.join(apiDir, 'route.ts');

fs.copyFileSync(sourceRoute, targetRoute);

console.log('✅ Cosmic Auth API routes installed successfully!'); 