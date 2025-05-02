import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { X, Camera, Upload } from 'lucide-react-native';

interface CoachProfile {
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string[];
  photoUrl?: string;
}

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (profile: CoachProfile) => void;
  initialProfile?: CoachProfile;
}

export function EditProfileModal({ onClose, onSave, initialProfile }: EditProfileModalProps) {
  const { theme } = useThemeContext();
  const [profile, setProfile] = useState<CoachProfile>(initialProfile || {
    name: '',
    email: '',
    phone: '',
    bio: '',
    specialties: [],
    photoUrl: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg',
  });

  const handleSave = () => {
    onSave(profile);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Editar Perfil</Text>
        <Button
          title=""
          variant="ghost"
          onPress={onClose}
          icon={<X size={24} color={theme.text} />}
        />
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.photoSection}>
          <View style={styles.photoContainer}>
            {profile.photoUrl ? (
              <Image
                source={{ uri: profile.photoUrl }}
                style={styles.profilePhoto}
              />
            ) : (
              <View style={[styles.photoPlaceholder, { backgroundColor: theme.muted }]}>
                <Camera size={32} color={theme.textSecondary} />
              </View>
            )}
          </View>
          <Button
            title="Alterar Foto"
            variant="outline"
            onPress={() => {}}
            icon={<Upload size={18} color={theme.primary} />}
            iconPosition="left"
            style={styles.photoButton}
          />
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Nome Completo</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            placeholder="Seu nome"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.label, { color: theme.text }]}>E-mail</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
            placeholder="seu.email@exemplo.com"
            placeholderTextColor={theme.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={[styles.label, { color: theme.text }]}>Telefone</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={profile.phone}
            onChangeText={(text) => setProfile({ ...profile, phone: text })}
            placeholder="(00) 00000-0000"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
          />

          <Text style={[styles.label, { color: theme.text }]}>Biografia</Text>
          <TextInput
            style={[styles.textArea, { color: theme.text, borderColor: theme.border }]}
            value={profile.bio}
            onChangeText={(text) => setProfile({ ...profile, bio: text })}
            placeholder="Conte um pouco sobre sua experiência..."
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
          />
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={onClose}
          style={styles.footerButton}
        />
        <Button
          title="Salvar Alterações"
          onPress={handleSave}
          style={styles.footerButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    overflow: 'hidden',
  },
  profilePhoto: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButton: {
    minWidth: 150,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlignVertical: 'top',
    minHeight: 120,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});