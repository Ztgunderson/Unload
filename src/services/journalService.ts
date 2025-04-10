import { getFirestore, collection, addDoc, updateDoc, doc, query, where, getDocs, deleteDoc, Timestamp, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore } from './firebase';
import NLPService from './NLPService';

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

export const getJournalEntries = async (date?: Date) => {
  try {
    const userId = getAuth().currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const entriesRef = collection(firestore, 'journals');
    let q = query(entriesRef, where('userId', '==', userId));
    
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
      
      q = query(q, 
        where('createdAt', '>=', Timestamp.fromDate(startOfDay)),
        where('createdAt', '<=', Timestamp.fromDate(endOfDay))
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as JournalEntry[];
  } catch (error) {
    console.error('Error fetching journal entries:', error);
    throw error;
  }
};

export const createJournalEntry = async (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'userId'>) => {
  try {
    const userId = getAuth().currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    // Analyze the text using Google Cloud NLP
    const analysis = await NLPService.analyzeText(entry.content);

    const newEntry = {
      ...entry,
      createdAt: Timestamp.now(),
      userId,
      sentiment: analysis.sentiment,
      entities: analysis.entities,
      syntax: analysis.syntax
    };

    const docRef = await addDoc(collection(firestore, 'journals'), newEntry);
    return {
      id: docRef.id,
      ...newEntry,
      createdAt: newEntry.createdAt.toDate()
    } as JournalEntry;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};

export const deleteJournalEntry = async (entryId: string) => {
  try {
    const userId = getAuth().currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const entryRef = doc(firestore, 'journals', entryId);
    const entryDoc = await getDoc(entryRef);
    
    if (!entryDoc.exists()) throw new Error('Entry not found');
    if (entryDoc.data().userId !== userId) throw new Error('Unauthorized');

    await deleteDoc(entryRef);
  } catch (error) {
    console.error('Error deleting journal entry:', error);
    throw error;
  }
};

export const getJournalEntriesByDateRange = async (startDate: Date, endDate: Date) => {
  try {
    const userId = getAuth().currentUser?.uid;
    if (!userId) throw new Error('User not authenticated');

    const entriesRef = collection(firestore, 'journals');
    const q = query(entriesRef,
      where('userId', '==', userId),
      where('createdAt', '>=', Timestamp.fromDate(startDate)),
      where('createdAt', '<=', Timestamp.fromDate(endDate))
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate()
    })) as JournalEntry[];
  } catch (error) {
    console.error('Error fetching journal entries by date range:', error);
    throw error;
  }
}; 