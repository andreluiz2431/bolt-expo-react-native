import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { ParkingMeter as RunningMen } from 'lucide-react-native';
import { GlobalStyles } from '@/constants/Colors';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as Linking from "expo-linking";
import axios from "axios";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "@env";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config'; // ou o caminho real do seu config Firebase
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen() {
  const [nome, setNome] = useState<string | null>(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem('user');
      if (dados) {
        const user = JSON.parse(dados);
        setNome(user.nome);
      }
    };
  
    carregarUsuario();
  }, []);

  const { theme } = useThemeContext();

  const router = useRouter();

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
            console.log("Usuário autenticado:", user.firstname + " " + user.lastname);

            // Aqui você pode salvar no estado ou Firebase
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


  // Mock data
  const stats = [
    { title: 'Alunos Ativos', value: '12' },
    { title: 'Treinos Esta Semana', value: '24' },
    { title: 'Competições Próximas', value: '3' },
  ];

  const recentUpdates = [
    { id: '1', student: 'Maria Silva', action: 'completou', training: 'treino de 10km', time: '1h atrás' },
    { id: '2', student: 'João Oliveira', action: 'agendou', training: 'uma competição', time: '3h atrás' },
    { id: '3', student: 'Ana Lúcia', action: 'completou', training: 'treino de tiros', time: '5h atrás' },
  ];

  const pendingActions = [
    { id: '1', action: 'Enviar plano semanal para 5 alunos' },
    { id: '2', action: 'Revisar progresso de João Oliveira' },
    { id: '3', action: 'Atualizar treino de Ana Lúcia' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>{nome ? `Olá, ${nome}` : "Olá, Treinador"}</Text>
            <Text style={[styles.date, { color: theme.textSecondary }]}>
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>
          </View>
          <RunningMen size={48} color={theme.primary} />
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.primary }]}>{stat.value}</Text>
              <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{stat.title}</Text>
            </Card>
          ))}
        </View>

        {/* Recent Updates */}
        <View style={styles.section}>
          <Text style={[GlobalStyles.subtitle, { color: theme.text }]}>Atualizações Recentes</Text>
          <Card>
            {recentUpdates.map((update) => (
              <View key={update.id} style={styles.updateItem}>
                <Text style={[styles.updateText, { color: theme.text }]}>
                  <Text style={{ fontFamily: 'Inter-SemiBold' }}>{update.student}</Text>
                  {` ${update.action} ${update.training}`}
                </Text>
                <Text style={[styles.updateTime, { color: theme.textSecondary }]}>{update.time}</Text>
              </View>
            ))}
          </Card>
        </View>

        {/* Pending Actions */}
        <View style={styles.section}>
          <Text style={[GlobalStyles.subtitle, { color: theme.text }]}>Ações Pendentes</Text>
          <Card>
            {pendingActions.map((item) => (
              <TouchableOpacity key={item.id} style={styles.actionItem}>
                <View style={[styles.actionDot, { backgroundColor: theme.primary }]} />
                <Text style={[styles.actionText, { color: theme.text }]}>{item.action}</Text>
              </TouchableOpacity>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: 16,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  updateItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  updateText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 4,
  },
  updateTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  actionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});