// Example Usage
// <ErrorMessage message="Invalid email address" />

import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Text 
      style={styles.errorText}
      accessibilityRole="alert"
    >
      {message}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: '#dc3545',
    fontSize: 14,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f8d7da',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#f5c6cb',
    textAlign: 'center'
  },
});

export default ErrorMessage;