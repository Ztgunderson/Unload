import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // Temporary mock data - will be replaced with actual data from backend
  const mockEntries = [
    {
      id: '1',
      title: 'Morning Reflection',
      date: '2024-03-20',
      preview: 'Today I felt particularly motivated to start new projects...',
    },
    {
      id: '2',
      title: 'Evening Thoughts',
      date: '2024-03-19',
      preview: 'Reflecting on the day, I noticed some interesting patterns...',
    },
  ];

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('Analysis', { entry: item })}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.date}</Paragraph>
        <Paragraph numberOfLines={2}>{item.preview}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockEntries}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('Journal')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen; 