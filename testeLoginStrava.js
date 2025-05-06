require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

const client_id = process.env.STRAVA_CLIENT_ID;
const client_secret = process.env.STRAVA_CLIENT_SECRET;
const redirect_uri = process.env.STRAVA_REDIRECT_URI;

// 1. Rota para iniciar login com Strava
app.get('/connect', (req, res) => {
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=read,activity:read_all`;
  res.redirect(authUrl);
});

// 2. Rota de callback para trocar o code pelo access_token
app.get('/exchange_token', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenResponse = await axios.post('https://www.strava.com/oauth/token', {
      client_id,
      client_secret,
      code,
      grant_type: 'authorization_code'
    });

    const access_token = tokenResponse.data.access_token;

    // 3. Obter atividades do usuário
    const activitiesResponse = await axios.get('https://www.strava.com/api/v3/athlete/activities', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    res.json({
      message: 'Atividades do usuário',
      activities: activitiesResponse.data
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('App rodando em http://localhost:3000');
  console.log('Abra http://localhost:3000/connect para iniciar o login com Strava');
});
