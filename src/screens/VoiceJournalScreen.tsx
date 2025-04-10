// VoiceJournalScreen.tsx
// Usage: App navigation stack component for voice journaling feature

import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import VoiceRecorder from '../components/journal/VoiceRecorder';
import JournalForm from '../components/journal/JournalForm';

interface VoiceJournalScreenProps {
  userId: string;
}

const VoiceJournalScreen: React.FC<VoiceJournalScreenProps> = ({ userId }) => {
  const [transcribedText, setTranscribedText] = useState('');

  const handleSaveSuccess = () => {
    setTranscribedText(''); // Clear transcription after successful save
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <VoiceRecorder onTranscription={(text) => console.log('Transcribed text:', text)}/>
      
      <JournalForm 
        transcribedText={transcribedText}
        onSave={handleSaveSuccess}
        userId={userId}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40, // Extra space for scroll
  },
});

export default VoiceJournalScreen;