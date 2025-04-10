import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { JournalEntry } from '../services/journalService';
import NlpDataDisplay from '../components/NlpDataDisplay';

type JournalDetailScreenRouteProp = RouteProp<{
  JournalDetail: { entry: JournalEntry };
}, 'JournalDetail'>;

interface JournalDetailScreenProps {
  route: JournalDetailScreenRouteProp;
}

const JournalDetailScreen: React.FC<JournalDetailScreenProps> = ({ route }) => {
  const { entry } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {entry.title && (
          <Text style={styles.title}>{entry.title}</Text>
        )}
        <Text style={styles.date}>
          {entry.createdAt.toDate().toLocaleDateString()}
        </Text>
        <Text style={styles.contentText}>{entry.content}</Text>
        
        {entry.sentiment && (
          <NlpDataDisplay
            sentiment={entry.sentiment}
            entities={entry.entities}
            syntax={entry.syntax}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
});

export default JournalDetailScreen; 