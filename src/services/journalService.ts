import { getFirestore, collection, addDoc, updateDoc, doc, query, where, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth } from 'firebase/auth';
import { initializeFirebase } from '../config/firebase';
import { firestore } from './firebase';

interface AnalysisResult {
  sentiment: {
    score: number;
    magnitude: number;
  };
  entities: Array<{
    name: string;
    type: string;
    salience: number;
  }>;
  syntax: {
    sentences: Array<{
      text: string;
      sentiment: number;
    }>;
  };
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  userId: string;
  sentiment?: {
    score: number;
    magnitude: number;
  };
  entities?: Array<{
    name: string;
    type: string;
    salience: number;
  }>;
  syntax?: {
    sentences: Array<{
      text: string;
      sentiment: number;
    }>;
  };
}

// Mock data
const mockEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'First Entry',
    content: 'This is my first journal entry.',
    createdAt: new Date(),
    userId: 'mock-user-id',
    sentiment: {
      score: 0.5,
      magnitude: 0.8
    }
  },
  {
    id: '2',
    title: 'Second Entry',
    content: 'This is my second journal entry.',
    createdAt: new Date(),
    userId: 'mock-user-id',
    sentiment: {
      score: 0.3,
      magnitude: 0.6
    }
  }
];

export const getJournalEntries = async (date?: Date) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockEntries;
};

export const createJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'userId'>) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newEntry: JournalEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date(),
    userId: 'mock-user-id'
  };
  mockEntries.push(newEntry);
  return newEntry;
};

export const deleteJournalEntry = async (entryId: string) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const index = mockEntries.findIndex(entry => entry.id === entryId);
  if (index !== -1) {
    mockEntries.splice(index, 1);
  }
}; 