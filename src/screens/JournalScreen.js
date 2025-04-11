import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Text, ActivityIndicator } from 'react-native-paper';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

const JournalScreen = () => {
  const [recording, setRecording] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      
      // Here you would typically:
      // 1. Save the recording
      // 2. Transcribe the audio
      // 3. Process with AI
      // For now, we'll just navigate back
      navigation.navigate('Home');
    } catch (err) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Your Thoughts</Text>
      <Text style={styles.subtitle}>
        Press and hold the button to start recording your journal entry
      </Text>

      {isProcessing ? (
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" />
          <Text style={styles.processingText}>Processing your entry...</Text>
        </View>
      ) : (
        <Button
          mode="contained"
          onPressIn={startRecording}
          onPressOut={stopRecording}
          style={styles.recordButton}
          icon={isRecording ? 'stop' : 'microphone'}
        >
          {isRecording ? 'Release to Stop' : 'Hold to Record'}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  recordButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingContainer: {
    alignItems: 'center',
  },
  processingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default JournalScreen; 