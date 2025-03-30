// EntryModal.tsx
// Usage: <EntryModal visible={showModal} entry={selectedEntry} onClose={() => setShowModal(false)} />

import React from 'react';
import { Modal, View, Text, StyleSheet, ScrollView } from 'react-native';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import { JournalEntry } from '../../services/firebase/types';

interface EntryModalProps {
  visible: boolean;
  entry: JournalEntry | null;
  onClose: () => void;
}

const EntryModal: React.FC<EntryModalProps> = ({ visible, entry, onClose }) => {
  if (!entry) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Journal Entry Details</Text>
            
            <View style={styles.section}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>
                {entry.date.toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Main Emotion:</Text>
              <Text style={[styles.value, styles.emotionText]}>
                {entry.mainEmotion}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Secondary Emotions:</Text>
              <View style={styles.emotionContainer}>
                {entry.secondaryEmotions.map((emotion, index) => (
                  <Text key={index} style={styles.emotionPill}>
                    {emotion}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Emotion Summary:</Text>
              <Text style={styles.value}>{entry.emotionSummary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Topic Summary:</Text>
              <Text style={styles.value}>{entry.topicSummary}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Positive Point:</Text>
              <Text style={[styles.value, styles.positiveText]}>
                {entry.positivePoint}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Full Entry:</Text>
              <Text style={[styles.value, styles.fullText]}>
                {entry.fullText}
              </Text>
            </View>

            <View style={styles.closeButton}>
              <Button
                title="Close"
                onPress={onClose}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    maxHeight: '80%',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  section: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 22,
  },
  emotionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  emotionPill: {
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    margin: 3,
    fontSize: 14,
  },
  emotionText: {
    color: '#2980b9',
    fontWeight: '500',
  },
  positiveText: {
    color: '#27ae60',
    fontWeight: '500',
  },
  fullText: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  closeButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
});

export default EntryModal;