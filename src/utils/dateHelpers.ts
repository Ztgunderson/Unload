// dateHelpers.ts
// Usage:
// import { formatDate, parseFirebaseDate, getMonthRange, isSameDay } from './dateHelpers'
// formatDate(new Date()) => "April 15, 2023"
// parseFirebaseDate(timestamp) => Date object
// getMonthRange(new Date()) => { start: Date, end: Date }
// isSameDay(date1, date2) => boolean

import { Timestamp } from 'firebase/firestore';

export const formatDate = (date: Date | string, options: Intl.DateTimeFormatOptions = {}): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

export const parseFirebaseDate = (timestamp: Timestamp | Date): Date => {
  return timestamp instanceof Date ? timestamp : timestamp.toDate();
};

export const getMonthRange = (date: Date): { start: Date; end: Date } => {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

export const isSameDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
};

export const toFirebaseTimestamp = (date: Date): Timestamp => {
  return Timestamp.fromDate(date);
};