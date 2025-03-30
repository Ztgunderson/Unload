// C:\Users\Talks\Documents\AI-Health-Agent\Unload\app\index.tsx

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Health Agent</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Welcome to your health companion</Text>
        <Text style={styles.description}>
          Track your health journey, manage journals, and view your calendar all in one place.
        </Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Link href="/journal" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Journal</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/calendar" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Calendar</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    alignItems: 'center',
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginHorizontal: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});