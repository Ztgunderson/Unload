// JournalForm.tsx
// Usage: <JournalForm transcribedText={transcribedText} onSave={handleSaveSuccess} />

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { firebase } from '../../services/firebaseConfig';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import LoadingOverlay from '../common/LoadingOverlay';

interface JournalFormProps {
  transcribedText: string;
  onSave: () => void; // Callback when save is successful
}

interface JournalEntryData {
  userId: string;
  date: firebase.firestore.Timestamp;
  mainEmotion: string;
  secondaryEmotions: string[];
  emotionSummary: string;
  topicSummary: string;
  positivePoint: string;
  fullText: string;
}

const JournalForm: React.FC<JournalFormProps> = ({ transcribedText, onSave }) => {
  const [mainEmotion, setMainEmotion] = useState('');
  const [secondaryEmotions, setSecondaryEmotions] = useState('');
  const [emotionSummary, setEmotionSummary] = useState('');
  const [topicSummary, setTopicSummary] = useState('');
  const [positivePoint, setPositivePoint] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!mainEmotion || !transcribedText) {
      setError('Main emotion and transcribed text are required');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      const userId = firebase.auth().currentUser?.uid; // Assuming user is authenticated
      if (!userId) throw new Error('User not authenticated');

      const entryRef = firebase.firestore()
        .collection('journalEntries')
        .doc(userId)
        .collection('entries')
        .doc();

      const entryData: JournalEntryData = {
        userId,
        date: firebase.firestore.Timestamp.now(),
        mainEmotion,
        secondaryEmotions: secondaryEmotions.split(',').map(e => e.trim()),
        emotionSummary,
        topicSummary,
        positivePoint,
        fullText: transcribedText
      };

      await entryRef.set(entryData);
      onSave(); // Notify parent component of successful save
      clearForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save entry');
    } finally {
      setIsSaving(false);
    }
  };

  const clearForm = () => {
    setMainEmotion('');
    setSecondaryEmotions('');
    setEmotionSummary('');
    setTopicSummary('');
    setPositivePoint('');
  };

  return (
    <View style={styles.container}>
      <ErrorMessage message={error} />

      <Text style={styles.label}>Main Emotion *</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter main emotion"
        value={mainEmotion}
        onChangeText={setMainEmotion}
        editable={!isSaving}
      />

      <Text style={styles.label}>Secondary Emotions (comma-separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., happy, excited, calm"
        value={secondaryEmotions}
        onChangeText={setSecondaryEmotions}
        editable={!isSaving}
      />

      <Text style={styles.label}>Emotion Summary</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Describe your emotional state"
        value={emotionSummary}
        onChangeText={setEmotionSummary}
        multiline
        editable={!isSaving}
      />

      <Text style={styles.label}>Topic Summary</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Summarize discussed topics"
        value={topicSummary}
        onChangeText={setTopicSummary}
        multiline
        editable={!isSaving}
      />

      <Text style={styles.label}>Positive Point of the Day</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="What went well today?"
        value={positivePoint}
        onChangeText={setPositivePoint}
        multiline
        editable={!isSaving}
      />

      <Button
        title="Save Journal Entry"
        onPress={handleSave}
        disabled={isSaving || !mainEmotion || !transcribedText}
      />

      <LoadingOverlay visible={isSaving} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  multiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
});

export default JournalForm;