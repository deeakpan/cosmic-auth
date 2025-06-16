require('dotenv').config();
const fetch = require('node-fetch');

async function test() {
  try {
    const response = await fetch('https://dev-1usujmbby8627ni8.us.auth0.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.ORBITPORT_CLIENT_ID,
        client_secret: process.env.ORBITPORT_CLIENT_SECRET,
        audience: 'https://op.spacecomputer.io/api/v1/',
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Response not OK:', response.status, text);
      return;
    }

    const data = await response.json();
    console.log('Success:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

test(); 