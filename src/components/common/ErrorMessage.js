/**
 * Error Message Component
 * Componente para mostrar errores
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ErrorMessage = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <Text style={styles.icon}>⚠️</Text>
        <Text style={styles.text}>{message}</Text>
        {onDismiss && (
          <TouchableOpacity onPress={onDismiss}>
            <Text style={styles.closeButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
    fontSize: 16,
  },
  text: {
    flex: 1,
    color: '#991b1b',
    fontSize: 14,
  },
  closeButton: {
    color: '#ef4444',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default ErrorMessage;
