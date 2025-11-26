import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../context/AuthContext';
import { ForumProvider } from '../context/ForumContext';
import AppNavigator from '../navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ForumProvider>
          <StatusBar style="auto" />
          <AppNavigator />
        </ForumProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}