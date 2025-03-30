// src/services/voice/voiceService.ts
// Usage: 
// import { startVoiceRecognition, stopVoiceRecognition } from './voiceService'
// Call startVoiceRecognition() with handlers for results and errors

import Voice from '@react-native-voice/voice';

type SpeechResultsHandler = (results: string[]) => void;
type SpeechErrorHandler = (error: string) => void;

// Configure voice recognition settings
const VOICE_CONFIG = {
  RECOGNIZER_LANGUAGE: 'en-US',
  MINIMUM_CONFIDENCE: 0.4
};

// Initialize voice recognition module
const initializeVoice = async () => {
  try {
    await Voice.destroy();
    await Voice.removeAllListeners();
  } catch (error) {
    console.error('Voice initialization error:', error);
  }
};

// Start voice recognition with handlers
const startVoiceRecognition = async (
  onResults: SpeechResultsHandler,
  onError: SpeechErrorHandler
): Promise<boolean> => {
  try {
    await initializeVoice();
    
    Voice.onSpeechStart = () => console.log('Speech recognition started');
    Voice.onSpeechEnd = () => console.log('Speech recognition ended');
    
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0 && e.value[0].trim().length > 0) {
        onResults(e.value);
      }
    };

    Voice.onSpeechError = (e) => {
      const errorMessage = parseVoiceError(e.error?.message || 'Unknown error');
      onError(errorMessage);
    };

    const isAvailable = await Voice.isAvailable();
    if (!isAvailable) {
      throw new Error('Voice recognition not available');
    }

    await Voice.start(VOICE_CONFIG.RECOGNIZER_LANGUAGE);
    return true;
    
  } catch (error) {
    console.error('Start recognition error:', error);
    onError(error instanceof Error ? error.message : 'Failed to start recognition');
    return false;
  }
};

// Stop voice recognition
const stopVoiceRecognition = async (): Promise<void> => {
  try {
    await Voice.stop();
    await Voice.destroy();
  } catch (error) {
    console.error('Stop recognition error:', error);
    throw new Error('Failed to stop recognition');
  }
};

// Convert voice error codes to user-friendly messages
const parseVoiceError = (errorCode: string): string => {
  const errorMap: { [key: string]: string } = {
    '7': 'Speech recognition timeout',
    '6': 'Speech input too short',
    '5': 'No speech input detected',
    '4': 'Insufficient permissions',
  };

  return errorMap[errorCode] || 'Unknown error occurred';
}