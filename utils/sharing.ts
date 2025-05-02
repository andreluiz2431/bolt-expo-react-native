import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import { Platform } from 'react-native';
import { Training, TrainingWeek } from '@/types';

/**
 * Formats a training week into a shareable text format
 */
export function formatTrainingWeek(trainingWeek: TrainingWeek): string {
  let formattedText = `${trainingWeek.weekName}\n\n`;

  // Group trainings by day
  const trainingsByDay = trainingWeek.trainings.reduce<Record<string, Training[]>>((acc, training) => {
    if (!acc[training.day]) {
      acc[training.day] = [];
    }
    acc[training.day].push(training);
    return acc;
  }, {});

  // Format each day's trainings
  Object.entries(trainingsByDay).forEach(([day, trainings]) => {
    formattedText += `✔️ ${day}\n`;
    
    trainings.forEach((training) => {
      // Add training details
      if (training.distance) {
        formattedText += `${training.distance}km`;
        
        if (training.type !== 'Normal') {
          formattedText += ` ${training.type.toLowerCase()}`;
        }
        
        formattedText += '\n';
      }
      
      // Add pace if available
      if (training.pace) {
        formattedText += `Pace: ${training.pace}\n`;
      }
      
      // Add duration if available
      if (training.duration) {
        const hours = Math.floor(training.duration / 60);
        const minutes = training.duration % 60;
        formattedText += `Duração: ${hours > 0 ? `${hours}h` : ''}${minutes > 0 ? `${minutes}min` : ''}\n`;
      }
      
      // Add notes if available
      if (training.notes) {
        formattedText += `${training.notes}\n`;
      }
      
      formattedText += '\n';
    });
  });

  return formattedText;
}

/**
 * Copies the formatted training week to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await Clipboard.setStringAsync(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard', error);
    return false;
  }
}

/**
 * Opens WhatsApp with the formatted training week
 */
export async function shareViaWhatsApp(phone: string, text: string): Promise<boolean> {
  try {
    const formattedPhone = phone.replace(/\D/g, '');
    const encodedText = encodeURIComponent(text);
    
    let url = '';
    
    // Different URLs for web and mobile
    if (Platform.OS === 'web') {
      url = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedText}`;
    } else {
      url = `whatsapp://send?phone=${formattedPhone}&text=${encodedText}`;
    }
    
    const canOpen = await Linking.canOpenURL(url);
    
    if (canOpen) {
      await Linking.openURL(url);
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to share via WhatsApp', error);
    return false;
  }
}