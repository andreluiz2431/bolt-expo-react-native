import { useEffect, useState } from 'react';
import { useFonts as useExpoFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export function useFonts() {
  const [fontsLoaded, fontsError] = useExpoFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      setIsReady(true);
    }
  }, [fontsLoaded, fontsError]);

  return {
    fontsLoaded,
    fontsError,
    isReady,
  };
}