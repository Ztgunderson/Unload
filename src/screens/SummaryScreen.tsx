import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text, Button, Card, Portal, Dialog, Title, Paragraph } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../App';

type SummaryScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Summary'>;

interface SummaryScreenProps {
  navigation: SummaryScreenNavigationProp;
}

interface MoodEntry {
  date: string;
  mood: number; // 1-5 scale (1: angry, 5: happy)
}

const SummaryScreen: React.FC<SummaryScreenProps> = ({ navigation }) => {
  const [showWrapUp, setShowWrapUp] = useState(false);
  
  // Mock data for mood entries
  const mockMoodEntries: MoodEntry[] = [
    { date: '2024-03-20', mood: 4 },
    { date: '2024-03-19', mood: 2 },
    { date: '2024-03-18', mood: 3 },
    { date: '2024-03-17', mood: 5 },
    { date: '2024-03-16', mood: 1 },
  ];

  const moodEmojis = ['😠', '😞', '😐', '😊', '😄'];
  
  const getMarkedDates = () => {
    const marked: any = {};
    mockMoodEntries.forEach(entry => {
      marked[entry.date] = {
        customStyles: {
          container: {
            backgroundColor: 'rgba(98, 0, 238, 0.1)',
          },
          text: {
            color: '#6200ee',
          },
        },
        marked: true,
        dotColor: '#6200ee',
      };
    });
    return marked;
  };

  const getMoodEmoji = (mood: number) => {
    return moodEmojis[mood - 1];
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Card style={styles.card}>
          <Card.Content>
            <Title>Your Mood Scale</Title>
            <View style={styles.moodScale}>
              {moodEmojis.map((emoji, index) => (
                <View key={index} style={styles.moodItem}>
                  <Text style={styles.emoji}>{emoji}</Text>
                  <Text style={styles.moodLabel}>
                    {index === 0 ? 'Angry' : 
                     index === 1 ? 'Sad' : 
                     index === 2 ? 'Neutral' : 
                     index === 3 ? 'Happy' : 'Very Happy'}
                  </Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title>Mood Calendar</Title>
            <Calendar
              markedDates={getMarkedDates()}
              markingType="custom"
              theme={{
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#6200ee',
                selectedDayBackgroundColor: '#6200ee',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#6200ee',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#6200ee',
                selectedDotColor: '#ffffff',
                arrowColor: '#6200ee',
                monthTextColor: '#6200ee',
                indicatorColor: '#6200ee',
              }}
            />
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={() => setShowWrapUp(true)}
          style={styles.wrapUpButton}
          icon="analytics"
        >
          Wrap It Up
        </Button>
      </ScrollView>

      <Portal>
        <Dialog visible={showWrapUp} onDismiss={() => setShowWrapUp(false)}>
          <Dialog.Title>Your Week in Review</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Average Mood: {getMoodEmoji(3)}</Paragraph>
            <Paragraph>Most Common Mood: {getMoodEmoji(4)}</Paragraph>
            <Paragraph>Total Entries: 5</Paragraph>
            <Paragraph>Mood Trend: Improving</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowWrapUp(false)}>Close</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  moodScale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  moodItem: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
  },
  wrapUpButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default SummaryScreen; 