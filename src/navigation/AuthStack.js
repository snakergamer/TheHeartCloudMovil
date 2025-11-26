import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  TermsScreen
} from '../screens';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen}
        options={{ title: 'Iniciar Sesión' }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{ title: 'Crear Cuenta' }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{ title: 'Recuperar Contraseña' }}
      />
      <Stack.Screen 
        name="Terms" 
        component={TermsScreen}
        options={{ title: 'Términos y Condiciones' }}
      />
    </Stack.Navigator>
  );
}