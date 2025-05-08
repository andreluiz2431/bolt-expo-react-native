import { useEffect } from 'react';
import * as Linking from "expo-linking";
import axios from "axios";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "@env";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStravaAuth() {
  useEffect(() => {
    const checkLoginCallback = async () => {
      const url = await Linking.getInitialURL();

      if (url && url.includes("code=")) {
        const code = new URL(url).searchParams.get("code");

        if (code) {
          try {
            const tokenRes = await axios.post("https://www.strava.com/oauth/token", {
              client_id: STRAVA_CLIENT_ID,
              client_secret: STRAVA_CLIENT_SECRET,
              code,
              grant_type: "authorization_code",
            });

            const access_token = tokenRes.data.access_token;

            const athleteRes = await axios.get("https://www.strava.com/api/v3/athlete", {
              headers: { Authorization: `Bearer ${access_token}` },
            });

            const user = athleteRes.data;

            await setDoc(doc(db, "users", user.id.toString()), {
              id: user.id,
              nome: user.firstname + " " + user.lastname,
              email: user.email || "não informado",
              createdAt: new Date(),
            });

            await AsyncStorage.setItem(
              'user',
              JSON.stringify({
                id: user.id,
                nome: user.firstname + " " + user.lastname,
                email: user.email || null,
              })
            );

          } catch (err) {
            console.error("Erro ao autenticar com Strava", err);
          }
        }
      }
    };

    checkLoginCallback();
  }, []);
}
