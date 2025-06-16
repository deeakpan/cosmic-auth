require('dotenv').config();
const { generatePassword } = require('./dist/index.js');

async function test() {
  try {
    console.log('Testing password generation...');
    
    // Test with default settings
    const defaultPassword = await generatePassword();
    console.log('\nDefault settings (16 chars, all types):');
    console.log(defaultPassword);

    // Test with custom settings
    const customPassword = await generatePassword({
      length: 20,
      includeUppercase: true,
      includeLowercase: true,
      includeNumbers: true,
      includeSymbols: false
    });
    console.log('\nCustom settings (20 chars, no symbols):');
    console.log(customPassword);

  } catch (error) {
    console.error('Error:', error);
  }
}

test(); 