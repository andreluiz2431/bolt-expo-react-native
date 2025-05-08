import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { useUserContext } from '@/context/UserContext';
import { Card } from '@/components/ui/Card';
import { ParkingMeter as RunningMen } from 'lucide-react-native';
import { GlobalStyles } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useStravaAuth } from '@/hooks/useStravaAuth';
import { stats, recentUpdates, pendingActions } from '@/constants/dashboardData';

export default function DashboardScreen() {
  useAuthRedirect();
  useStravaAuth();

  const { user } = useUserContext();
  const { theme } = useThemeContext();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Seção de Boas-vindas */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: theme.text }]}>
              {user?.nome ? `Olá, Assessor ${user.nome}` : "Olá, Treinador"}
            </Text>
            <Text style={[styles.date, { color: theme.textSecondary }]}>
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </Text>
          </View>
          <RunningMen size={48} color={theme.primary} />
        </View>

        {/* Cards com estatísticas */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Text style={[styles.statValue, { color: theme.primary }]}>{stat.value}</Text>
              <Text style={[styles.statTitle, { color: theme.textSecondary }]}>{stat.title}</Text>
            </Card>
          ))}
        </View>

        {/* Atualizações Recentes */}
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

        {/* Ações Pendentes */}
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
