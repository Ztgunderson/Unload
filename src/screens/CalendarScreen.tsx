// CalendarScreen.tsx
// Usage: <CalendarScreen userId={authenticatedUserId} />

import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { firebase } from '../services/firebase/config';
import CalendarMarkers from '../components/calendar/CalendarMarkers';
import EntryModal from '../components/calendar/EntryModal';
import ErrorMessage from '../components/common/ErrorMessage';
import { JournalEntry } from '../services/firebase/types';

interface CalendarScreenProps {
  userId: string;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ userId }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    setError('');
    
    try {
      const entriesRef = firebase.firestore()
        .collection('journalEntries')
        .doc(userId)
        .collection('entries')
        .orderBy('date', 'desc');

      const unsubscribe = entriesRef.onSnapshot(snapshot => {
        const entriesData: JournalEntry[] = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          entriesData.push({
            ...data,
            id: doc.id,
            date: data.date, // Firestore timestamp
          } as JournalEntry);
        });
        setEntries(entriesData);
        setLoading(false);
      });

      return unsubscribe;
    } catch (err) {
      setError('Failed to load journal entries');
      setLoading(false);
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    const unsubscribe = fetchEntries();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchEntries]);

  const handleDayPress = (date: string) => {
    setSelectedDate(date);
    const dailyEntries = entries.filter(entry => 
      entry.date.toDate().toISOString().split('T')[0] === date
    );
    setSelectedEntry(dailyEntries[0] || null);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
    setSelectedEntry(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ErrorMessage message={error} />
      
      <CalendarMarkers
        entries={entries}
        onDayPress={handleDayPress}
        loading={loading}
        error={error}
      />

      <EntryModal
        visible={!!selectedDate}
        entry={selectedEntry}
        onClose={handleCloseModal}
      />

      {loading && (
        <ActivityIndicator 
          size="large" 
          style={styles.loading} 
          color="#2196F3" 
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  loading: {
    marginTop: 20
  }
});

export default CalendarScreen;