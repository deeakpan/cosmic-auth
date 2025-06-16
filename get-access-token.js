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