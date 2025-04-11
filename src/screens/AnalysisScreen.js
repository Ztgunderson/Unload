import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Divider } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

const AnalysisScreen = () => {
  const route = useRoute();
  const { entry } = route.params;

  // Mock AI analysis data - will be replaced with actual AI analysis
  const mockAnalysis = {
    sentiment: 'Positive',
    keyThemes: ['Motivation', 'Personal Growth', 'Future Planning'],
    insights: [
      'Strong focus on personal development and goal setting',
      'Positive outlook on future opportunities',
      'Clear expression of motivation and determination',
    ],
    recommendations: [
      'Consider setting specific milestones for your projects',
      'Explore time management techniques to maintain momentum',
      'Document progress regularly to track growth',
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{entry.title}</Title>
          <Paragraph>{entry.date}</Paragraph>
          <Paragraph>{entry.preview}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Sentiment Analysis</Title>
          <Paragraph style={styles.sentimentText}>{mockAnalysis.sentiment}</Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Key Themes</Title>
          {mockAnalysis.keyThemes.map((theme, index) => (
            <Paragraph key={index} style={styles.themeItem}>
              • {theme}
            </Paragraph>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Insights</Title>
          {mockAnalysis.insights.map((insight, index) => (
            <Paragraph key={index} style={styles.insightItem}>
              • {insight}
            </Paragraph>
          ))}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Recommendations</Title>
          {mockAnalysis.recommendations.map((recommendation, index) => (
            <Paragraph key={index} style={styles.recommendationItem}>
              • {recommendation}
            </Paragraph>
          ))}
        </Card.Content>
      </Card>
    </ScrollView>
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
  sentimentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 8,
  },
  themeItem: {
    marginLeft: 8,
    marginTop: 4,
  },
  insightItem: {
    marginLeft: 8,
    marginTop: 4,
  },
  recommendationItem: {
    marginLeft: 8,
    marginTop: 4,
  },
});

export default AnalysisScreen; 