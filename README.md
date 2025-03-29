# React Native Packages for AI Voice Journal

This document outlines the key React Native packages we'll focus on for the AI Voice Journal project, along with relevant documentation links.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Core React Native & Expo Packages

* **React Native:**
    * The base framework for building cross-platform mobile applications.
    * Documentation: [React Native Documentation](https://reactnative.dev/docs/getting-started)
* **Expo:**
    * A framework and platform for universal React applications. Simplifies development, build, and deployment.
    * Documentation: [Expo Documentation](https://docs.expo.dev/)
    * `npx create-expo-app` will be used to create the base project.
* **Firebase JS SDK:**
    * For interacting with Firebase services like Cloud Firestore (data storage) and potentially Firebase Storage (audio file storage).
    * `npx expo install firebase`
    * Documentation: [Firebase JS SDK](https://firebase.google.com/docs/web/setup)
* **@react-navigation/native:**
    * Used for navigation between different screens in the app.
    * `npx expo install @react-navigation/native @react-navigation/stack`
    * Documentation: [React Navigation](https://reactnavigation.org/docs/getting-started)

## Voice Functionality

* **Web Speech API (via WebView):**
    * For voice recording and transcription. Integrated via a WebView component.
    * Documentation: [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
    * React native webview: [React Native WebView](https://reactnative.dev/docs/webview)
* **Potential Alternative: @react-native-voice/voice or expo-speech-recognition:**
    * Considered for potentially higher accuracy and native device integration, but may add complexity.
    * Documentation:
        * [@react-native-voice/voice](https://github.com/react-native-voice/voice)
        * [expo-speech-recognition](https://docs.expo.dev/versions/latest/sdk/speech/)

## AI Integration

* **Anthropic Claude API (via HTTP requests):**
    * For text summarization, emotional analysis, and pattern recognition.
    * Documentation:
        * [Anthropic Claude API Documentation](https://console.anthropic.com/docs/)
        * [Anthropic API Postman](https://www.postman.com/postman/anthropic-apis/documentation/dhus72s/claude-api)

## Data Management & Vector Database

* **Cloud Firestore (Firebase):**
    * NoSQL document database for storing journal entries and metadata.
    * Documentation: [Cloud Firestore Documentation](https://firebase.google.com/docs/firestore)
* **ChromaDB (Potential Vector Database):**
    * For semantic search and similarity matching of journal entries, if vector database functionality is implemented.
    * Documentation: [ChromaDB Documentation](https://www.trychroma.com/docs)

### Firebase Schema

We'll use Cloud Firestore for our database. Since each user has their own collection of journal entries, we'll organize it as follows:

```
collections: {
users: { // Not strictly needed, but can be used for user profiles later
userId: { // Unique user ID
// User profile data (if needed)
}
},
journalEntries: {
userId: { // Unique user ID (creates a subcollection for each user)
entryId: { // Unique ID for each journal entry
date: Timestamp, // Date of the journal entry
entryId: String, // Special ID for the entry (same as the document ID)
mainEmotion: String, // Main emotion expressed
secondaryEmotions: Array<String>, // Array of secondary emotions
emotionSummary: String, // Summary of emotions felt
topicSummary: String, // Summary of topics discussed
positivePoint: String, // Positive point of the day
fullText: String, // Full text of the journal entry
audioUrl: String, // URL of the audio recording (if using Firebase Storage)
}
}
}
}
```

**Explanation:**

* **`users` Collection (Optional):**
    * This collection can store user profile information if needed.
    * Each document in this collection represents a user, with the document ID being the user's unique ID.
* **`journalEntries` Collection:**
    * This collection stores the journal entries.
    * Each user gets their own subcollection within `journalEntries`, named after their `userId`.
    * Each journal entry is a document within the user's subcollection, with the document ID being a unique `entryId`.
    * The fields within each journal entry document include:
        * `date`: A Firebase `Timestamp` representing the date and time of the entry.
        * `entryId`: A string that is the unique ID of the document.
        * `mainEmotion`: A string representing the primary emotion expressed.
        * `secondaryEmotions`: An array of strings representing all other emotions.
        * `emotionSummary`: A string summarizing the emotions felt.
        * `topicSummary`: A string summarizing the topics discussed.
        * `positivePoint`: A string describing a positive point of the day.
        * `fullText`: The full transcribed text of the journal entry.


## Additional Considerations

* **Async Storage:**
    * For local data storage (e.g., user settings).
    * `npx expo install @react-native-async-storage/async-storage`
    * Documentation: [Async Storage](https://reactnative.dev/docs/asyncstorage)
* **UI Libraries (Optional):**
    * Consider using UI libraries like React Native Paper or React Native Elements for pre-built components.
    * React Native Paper: [React Native Paper](https://reactnativepaper.com/)
    * React Native Elements: [React Native Elements](https://reactnativeelements.com/)
* **Axios or Fetch:**
    * For making HTTP requests to the Anthropic Claude API.
    * Documentation:
        * [Axios](https://axios-http.com/docs/intro)
        * [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)