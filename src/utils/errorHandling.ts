// errorHandling.ts
// Usage:
// import { handleFirebaseError, handleVoiceError, handleGenericError } from './errorHandling'
// try/catch (error) { showError(handleFirebaseError(error)) }

type ErrorWithCode = Error & { code?: string };

export const handleFirebaseError = (error: unknown): string => {
  const defaultMessage = 'Failed to complete operation';
  
  if (!(error instanceof Error)) return defaultMessage;
  
  const firebaseError = error as ErrorWithCode;
  
  switch (firebaseError.code) {
    case 'permission-denied':
      return 'You don\'t have permission to perform this action';
    case 'not-found':
      return 'Requested data not found';
    case 'unavailable':
      return 'Network error occurred. Please check your connection';
    case 'canceled':
      return 'Operation was canceled';
    default:
      return firebaseError.message || defaultMessage;
  }
};

export const handleVoiceError = (error: unknown): string => {
  const defaultMessage = 'Voice recognition failed';
  
  if (!(error instanceof Error)) return defaultMessage;
  
  const voiceError = error as ErrorWithCode;
  
  // Handle specific voice recognition error codes
  switch (voiceError.message) {
    case '7': return 'Speech input timeout';
    case '6': return 'Speech too short';
    case '5': return 'No speech detected';
    case '4': return 'Missing microphone permission';
    default: return voiceError.message || defaultMessage;
  }
};

export const handleGenericError = (error: unknown): string => {
  return error instanceof Error 
    ? error.message 
    : typeof error === 'string'
    ? error
    : 'An unknown error occurred';
};

export const logError = (error: unknown, context: string = '') => {
  const message = handleGenericError(error);
  console.error(`[${context}] Error:`, message);
  return message;
};