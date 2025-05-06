// services/stravaService.ts
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import axios from "axios";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI } from '@env';

const REDIRECT_URI = Linking.createURL("/");

export const signInWithStrava = async () => {
    const authUrl = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&approval_prompt=force&scope=read,activity:read_all`;

    const result = await WebBrowser.openAuthSessionAsync(authUrl, REDIRECT_URI);
    

  if (result.type === "success" && result.url) {
    const code = new URL(result.url).searchParams.get("code");

    const tokenRes = await axios.post("https://www.strava.com/oauth/token", {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
    });

    const { access_token } = tokenRes.data;

    const athleteRes = await axios.get("https://www.strava.com/api/v3/athlete", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return athleteRes.data;
  }

  throw new Error("Login via Strava falhou.");
};
