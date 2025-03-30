import { Timestamp } from 'firebase/firestore';

export interface FirebaseJournalEntry {
  userId: string;
  date: Timestamp;
  mainEmotion: string;
  secondaryEmotions: string[];
  emotionSummary: string;
  topicSummary: string;
  positivePoint: string;
  fullText: string;
}

export interface JournalEntry extends Omit<FirebaseJournalEntry, 'date'> {
  date: Date;
  entryId: string;
}

export type WithId<T> = T & { entryId: string };