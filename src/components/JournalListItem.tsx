import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { JournalEntry } from '../services/journalService';
import { format } from 'date-fns';

interface JournalListItemProps {
  entry: JournalEntry;
  onPress: () => void;
}

const JournalListItem: React.FC<JournalListItemProps> = ({ entry, onPress }) => {
  const getEmoji = (score: number) => {
    if (score > 0.3) return '😊';
    if (score < -0.3) return '😔';
    return '😐';
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{entry.title || 'Untitled Entry'}</Text>
          {entry.sentiment?.score !== undefined && (
            <Text style={styles.emoji}>
              {getEmoji(entry.sentiment.score)}
            </Text>
          )}
        </View>
        <Text style={styles.date}>
          {format(entry.createdAt, 'MMM d, yyyy h:mm a')}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {entry.content}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  emoji: {
    fontSize: 20,
    marginLeft: 8,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  preview: {
    fontSize: 14,
    color: '#333',
  },
});

export default JournalListItem; 