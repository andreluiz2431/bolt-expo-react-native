// app/login.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { signInWithStrava } from "@/services/stravaService";
import { db } from "@/firebase/config";
import { doc, setDoc } from "firebase/firestore";

export default function LoginScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await signInWithStrava();

      await setDoc(doc(db, "users", String(user.id)), {
        id: user.id,
        nome: user.firstname + " " + user.lastname,
        email: user.email,
        createdAt: new Date(),
      });

      router.replace("/"); // ou rota principal do app
    } catch (error) {
      console.error("Erro ao autenticar com Strava", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Comece entrando com o Strava</Text>
      <Button onPress={handleLogin}>Entrar com Strava</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 24,
  },
});
