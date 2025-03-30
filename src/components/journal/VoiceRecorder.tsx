// Example Usage
// <VoiceRecorder 
//  onTranscription={(text) => console.log('Transcribed text:', text)}
//  />

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Voice from '@react-native-voice/voice';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import LoadingOverlay from '../common/LoadingOverlay';

interface VoiceRecorderProps {
  onTranscription: (text: string) => void;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onTranscription }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsProcessing(true);
      setError('');
    };
    
    Voice.onSpeechEnd = () => {
      setIsProcessing(false);
    };
    
    Voice.onSpeechResults = (e) => {
      if (e.value?.[0]) {
        const text = e.value[0];
        setTranscribedText(text);
        onTranscription(text);
      }
    };
    
    Voice.onSpeechError = (e) => {
      setError(e.error?.message || 'Speech recognition error');
      setIsProcessing(false);
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, [onTranscription]);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
      setIsRecording(true);
      setTranscribedText('');
      setError('');
    } catch (err) {
      setError('Failed to start recording');
      console.error(err);
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (err) {
      setError('Failed to stop recording');
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <ErrorMessage message={error} />
      
      <View style={styles.buttonContainer}>
        <Button
          title={isRecording ? 'Stop Recording' : 'Start Recording'}
          onPress={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
        />
      </View>

      {isProcessing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#0000ff" />
          <Text style={styles.loadingText}>Processing...</Text>
        </View>
      )}

      {transcribedText ? (
        <View style={styles.transcriptContainer}>
          <Text style={styles.transcriptLabel}>Transcribed Text:</Text>
          <Text style={styles.transcriptText}>{transcribedText}</Text>
        </View>
      ) : null}

      <LoadingOverlay visible={isProcessing && !transcribedText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  buttonContainer: {
    marginBottom: 15,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: '#666',
  },
  transcriptContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  transcriptLabel: {
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  transcriptText: {
    color: '#666',
    lineHeight: 22,
  },
});

export default VoiceRecorder;