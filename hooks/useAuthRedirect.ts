// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const verificar = async () => {
      const user = await AsyncStorage.getItem('user');
      if (!user) router.replace('/LoginScreen');
    };
    verificar();
  }, []);
};
