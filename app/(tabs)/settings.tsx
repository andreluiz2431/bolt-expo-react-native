import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sun, Moon, LogOut, User, Bell, CircleHelp as HelpCircle, Shield, ChevronRight } from 'lucide-react-native';
import { GlobalStyles } from '@/constants/Colors';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { useLoadUser } from '@/hooks/useLoadUser';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useThemeContext();
  const router = useRouter();

  useAuthRedirect(); // redireciona se não logado

  const user = useLoadUser(); // ✅ Carrega o usuário com o hook

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Perfil</Text>
        <Card style={styles.profileCard}>
          <View style={styles.profileHeader}>
            {user?.profile ? (
              <Image
                source={{ uri: user.profile }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                <Text style={styles.avatarText}>
                  {user?.nome?.charAt(0).toUpperCase() ?? 'T'}
                </Text>
              </View>
            )}
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text }]}>
                {user?.nome ?? 'Treinador'}
              </Text>
              {user?.email && (
                <Text style={[styles.profileEmail, { color: theme.textSecondary }]}>
                  {user.email}
                </Text>
              )}
              <Text style={[styles.profileRole, { color: theme.primary }]}>
                Treinador
              </Text>
            </View>
          </View>
          <Button
            title="Editar Perfil"
            variant="outline"
            onPress={() => {}}
            icon={<User size={16} color={theme.primary} />}
            iconPosition="left"
            style={styles.editButton}
          />
        </Card>

        {/* Appearance Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Aparência</Text>
        <Card>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              {isDark ?
                <Moon size={20} color={theme.text} /> :
                <Sun size={20} color={theme.text} />
              }
              <Text style={[styles.settingText, { color: theme.text }]}>
                Tema Escuro
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D5DB', true: theme.primaryLight }}
              thumbColor={isDark ? theme.primary : '#FFFFFF'}
            />
          </View>
        </Card>

        {/* Notification Settings */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Notificações</Text>
        <Card>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Bell size={20} color={theme.text} />
              <Text style={[styles.settingText, { color: theme.text }]}>
                Configurações de Notificações
              </Text>
            </View>
            <ChevronRight size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Security Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Segurança</Text>
        <Card>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={20} color={theme.text} />
              <Text style={[styles.settingText, { color: theme.text }]}>
                Alterar Senha
              </Text>
            </View>
            <ChevronRight size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Help & Support */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Ajuda & Suporte</Text>
        <Card>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={20} color={theme.text} />
              <Text style={[styles.settingText, { color: theme.text }]}>
                FAQ & Ajuda
              </Text>
            </View>
            <ChevronRight size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        </Card>

        {/* Logout */}
        <View style={styles.logoutContainer}>
          <Button
            title="Sair da Conta"
            variant="danger"
            onPress={async () => {
              await AsyncStorage.clear();
              router.replace('/LoginScreen');
            }}
            icon={<LogOut size={18} color="#FFFFFF" />}
            iconPosition="left"
            fullWidth
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={[styles.appVersion, { color: theme.textSecondary }]}>
            Runner Coach v1.0.0
          </Text>
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginTop: 16,
    marginBottom: 8,
    paddingLeft: 4,
  },
  profileCard: {
    marginBottom: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  avatarImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    marginLeft: 12,
  },
  logoutContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  appInfo: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  appVersion: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});
