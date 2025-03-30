// CalendarMarkers.tsx
// Usage: <CalendarMarkers entries={journalEntries} onDayPress={(date) => handleDateSelect(date)} />
// Requires: react-native-calendars library installed

import React from 'react';
import { Calendar, DateData } from 'react-native-calendars';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { JournalEntry } from '../../services/firebase/types';
import Button from '../common/Button';

interface CalendarMarkersProps {
  entries: JournalEntry[];
  onDayPress?: (date: string) => void;
  loading?: boolean;
  error?: string;
}

interface JournalEntryCalendarData {
  [date: string]: {
    mainEmotion: string;
    entryCount: number;
  };
}

const CalendarMarkers: React.FC<CalendarMarkersProps> = ({ 
  entries, 
  onDayPress,
  loading = false,
  error
}) => {
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null);

  // Transform journal entries into calendar data format
  const calendarData = entries.reduce<JournalEntryCalendarData>((acc, entry) => {
    const date = entry.date.toISOString().split('T')[0];
    return {
      ...acc,
      [date]: {
        mainEmotion: acc[date]?.mainEmotion || entry.mainEmotion,
        entryCount: (acc[date]?.entryCount || 0) + 1
      }
    };
  }, {});

  // Create marked dates object for calendar
  const markedDates = Object.keys(calendarData).reduce((acc, date) => ({
    ...acc,
    [date]: {
      marked: true,
      dotColor: '#2196F3',
      selected: date === selectedDate
    }
  }), {});

  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    onDayPress?.(day.dateString);
  };

  const selectedData = selectedDate ? calendarData[selectedDate] : null;

  return (
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Calendar
        markingType="multi-dot"
        markedDates={markedDates}
        onDayPress={handleDayPress}
        theme={{
          calendarBackground: '#ffffff',
          todayTextColor: '#2196F3',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8'
        }}
      />

      <Modal visible={!!selectedData} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedData && (
              <>
                <Text style={styles.modalTitle}>
                  {selectedDate}
                </Text>
                <Text style={styles.statsText}>
                  Entries: {selectedData.entryCount}
                </Text>
                <Text style={styles.statsText}>
                  Main Emotion: {selectedData.mainEmotion}
                </Text>
                <Button
                  title="Close"
                  onPress={() => setSelectedDate(null)}
                />
              </>
            )}
          </View>
        </View>
      </Modal>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 16,
    elevation: 3
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  statsText: {
    fontSize: 16,
    marginBottom: 10
  },
  closeButton: {
    marginTop: 15
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.7)'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10
  }
});

export default CalendarMarkers;