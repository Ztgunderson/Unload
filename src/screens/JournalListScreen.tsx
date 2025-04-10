import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getJournalEntries } from '../services/journalService';
import JournalListItem from '../components/JournalListItem';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { JournalEntry } from '../services/journalService';

const JournalListScreen = () => {
  console.log('JournalListScreen: Rendering');
  
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('JournalListScreen: useEffect triggered');
    loadEntries();
  }, []);

  const loadEntries = async () => {
    console.log('JournalListScreen: Loading entries');
    try {
      setLoading(true);
      const journalEntries = await getJournalEntries();
      console.log('JournalListScreen: Entries loaded:', journalEntries);
      setEntries(journalEntries);
      setError(null);
    } catch (err) {
      console.error('JournalListScreen: Error loading entries:', err);
      setError(err instanceof Error ? err : new Error('Failed to load entries'));
    } finally {
      setLoading(false);
    }
  };

  const handleEntryPress = (entry: JournalEntry) => {
    navigation.navigate('JournalDetail', { entry });
  };

  if (loading) {
    console.log('JournalListScreen: Showing loading spinner');
    return <LoadingSpinner />;
  }

  if (error) {
    console.log('JournalListScreen: Showing error message');
    return <ErrorMessage message={error.message} onRetry={loadEntries} />;
  }

  console.log('JournalListScreen: Rendering entries list');
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Journal</Text>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={() => navigation.navigate('Calendar')}
        >
          <Text style={styles.calendarButtonText}>Calendar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <JournalListItem
            entry={item}
            onPress={() => handleEntryPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calendarButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#4285F4',
  },
  calendarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    padding: 16,
  },
});

export default JournalListScreen; 