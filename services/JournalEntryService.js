import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";

const JournalEntryService = {
  async addJournalEntry(userId, entryData) {
    try {
      const journalEntriesRef = collection(db, "journalEntries", userId, "entries");
      const docRef = await addDoc(journalEntriesRef, entryData);
      console.log("Document written with ID: ", docRef.id);
      return docRef.id;
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    }
  },

  async getJournalEntries(userId) {
    try {
      const journalEntriesRef = collection(db, "journalEntries", userId, "entries");
      const querySnapshot = await getDocs(journalEntriesRef);
      const entries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return entries;
    } catch (e) {
      console.error("Error getting documents: ", e);
      throw e;
    }
  },
  async updateJournalEntry(userId, entryId, entryData) {
    try {
      const entryRef = doc(db, "journalEntries", userId, "entries", entryId);
      await setDoc(entryRef, entryData);
      console.log("Document successfully updated!");
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
};

export default JournalEntryService;