require('dotenv').config();

console.log('API URL:', process.env.ORBITPORT_API_URL);
console.log('CLIENT ID:', process.env.ORBITPORT_CLIENT_ID);
console.log('CLIENT SECRET:', process.env.ORBITPORT_CLIENT_SECRET);
console.log('AUTH URL:', process.env.ORBITPORT_AUTH_URL);

const { generatePassword } = require('./dist/index.js');

(async () => {
  try {
    const password = await generatePassword({
      length: 10,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: true
    });
    console.log('Generated Password:', password);
  } catch (err) {
    console.error('Error:', err);
  }
})(); 