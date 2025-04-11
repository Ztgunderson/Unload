import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Modal } from 'react-native';
import { Button, Text, ActivityIndicator, Portal, Dialog, Title, Paragraph } from 'react-native-paper';
import { Audio } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';

type RecordingScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Recording'>;

interface RecordingScreenProps {
  navigation: RecordingScreenNavigationProp;
}

const RecordingScreen: React.FC<RecordingScreenProps> = ({ navigation }) => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReframe, setShowReframe] = useState(false);
  const [reframeText, setReframeText] = useState('');

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
      setIsProcessing(true);
      await recording?.stopAndUnloadAsync();
      setRecording(null);
      
      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
        setReframeText("Your feelings are valid and important. Remember that every challenge is an opportunity for growth. You're showing great self-awareness by expressing your emotions.");
        setShowReframe(true);
      }, 2000);
    } catch (err) {
      Alert.alert('Error', 'Failed to stop recording');
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Unload Your Thoughts</Text>
      <Text style={styles.subtitle}>
        Press and hold to record your thoughts
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

      <Portal>
        <Dialog visible={showReframe} onDismiss={() => setShowReframe(false)}>
          <Dialog.Title>Positive Reframe</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{reframeText}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowReframe(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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

export default RecordingScreen; 