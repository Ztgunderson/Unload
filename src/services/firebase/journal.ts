import { db } from './config';
import { 
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  Timestamp
} from 'firebase/firestore';
import { FirebaseJournalEntry, JournalEntry, WithId } from './types';

const entriesCollection = (userId: string) => 
  collection(db, 'journalEntries', userId, 'entries');

export const journalService = {
  async addEntry(userId: string, entry: Omit<JournalEntry, 'entryId' | 'date'>) {
    try {
      const docRef = await addDoc(entriesCollection(userId), {
        ...entry,
        date: Timestamp.fromDate(new Date())
      });
      return { ...entry, entryId: docRef.id } as WithId<JournalEntry>;
    } catch (error) {
      throw new Error('Failed to add journal entry');
    }
  },

  async getEntries(
    userId: string,
    options: {
      limit?: number;
      startAfter?: Date;
      startDate?: Date;
      endDate?: Date;
    } = {}
  ): Promise<WithId<JournalEntry>[]> {
    try {
      let q = query(entriesCollection(userId));

      if (options.startDate || options.endDate) {
        const dateFilters = [];
        if (options.startDate) {
          dateFilters.push(where('date', '>=', Timestamp.fromDate(options.startDate)));
        }
        if (options.endDate) {
          dateFilters.push(where('date', '<=', Timestamp.fromDate(options.endDate)));
        }
        q = query(q, ...dateFilters);
      }

      q = query(q, orderBy('date', 'desc'));

      if (options.limit) {
        q = query(q, limit(options.limit));
      }

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        ...doc.data() as FirebaseJournalEntry,
        entryId: doc.id,
        date: doc.data().date.toDate()
      }));
    } catch (error) {
      throw new Error('Failed to fetch journal entries');
    }
  },

  async updateEntry(
    userId: string,
    entryId: string,
    updates: Partial<JournalEntry>
  ): Promise<void> {
    try {
      const entryRef = doc(db, 'journalEntries', userId, 'entries', entryId);
      await updateDoc(entryRef, {
        ...updates,
        date: updates.date ? Timestamp.fromDate(updates.date) : undefined
      });
    } catch (error) {
      throw new Error('Failed to update journal entry');
    }
  }
};