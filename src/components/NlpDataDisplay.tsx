import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Sentiment {
  score: number;
  magnitude: number;
}

interface Entity {
  name: string;
  type: string;
  salience: number;
}

interface Syntax {
  sentences: Array<{
    text: string;
    sentiment: number;
  }>;
}

interface NlpDataDisplayProps {
  sentiment: Sentiment;
  entities?: Entity[];
  syntax?: Syntax;
}

const NlpDataDisplay: React.FC<NlpDataDisplayProps> = ({
  sentiment,
  entities,
  syntax,
}) => {
  const getSentimentLabel = (score: number) => {
    if (score > 0.3) return 'Positive';
    if (score < -0.3) return 'Negative';
    return 'Neutral';
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sentiment Analysis</Text>
        <View style={styles.sentimentContainer}>
          <Text style={styles.sentimentLabel}>
            {getSentimentLabel(sentiment.score)}
          </Text>
          <Text style={styles.sentimentScore}>
            Score: {sentiment.score.toFixed(2)}
          </Text>
          <Text style={styles.sentimentMagnitude}>
            Magnitude: {sentiment.magnitude.toFixed(2)}
          </Text>
        </View>
      </View>

      {entities && entities.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Entities</Text>
          {entities.map((entity, index) => (
            <View key={index} style={styles.entityContainer}>
              <Text style={styles.entityName}>{entity.name}</Text>
              <Text style={styles.entityType}>{entity.type}</Text>
              <Text style={styles.entitySalience}>
                Salience: {(entity.salience * 100).toFixed(1)}%
              </Text>
            </View>
          ))}
        </View>
      )}

      {syntax && syntax.sentences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sentence Analysis</Text>
          {syntax.sentences.map((sentence, index) => (
            <View key={index} style={styles.sentenceContainer}>
              <Text style={styles.sentenceText}>{sentence.text}</Text>
              <Text style={styles.sentenceSentiment}>
                Sentiment: {sentence.sentiment.toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sentimentContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
  },
  sentimentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sentimentScore: {
    fontSize: 14,
    color: '#666',
  },
  sentimentMagnitude: {
    fontSize: 14,
    color: '#666',
  },
  entityContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  entityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  entityType: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  entitySalience: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sentenceContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  sentenceText: {
    fontSize: 14,
    marginBottom: 4,
  },
  sentenceSentiment: {
    fontSize: 14,
    color: '#666',
  },
});

export default NlpDataDisplay; 