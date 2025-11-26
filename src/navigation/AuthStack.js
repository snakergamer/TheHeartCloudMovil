import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
} from '../screens/auth';
import { TermsScreen, PrivacyScreen } from '../screens/common';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen}
        options={{
          headerShown: true,
          title: 'Crear Cuenta',
        }}
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPasswordScreen}
        options={{
          headerShown: true,
          title: 'Recuperar Contraseña',
        }}
      />
      <Stack.Screen 
        name="Terms" 
        component={TermsScreen}
        options={{
          headerShown: true,
          title: 'Términos y Condiciones',
        }}
      />
      <Stack.Screen 
        name="Privacy" 
        component={PrivacyScreen}
        options={{
          headerShown: true,
          title: 'Política de Privacidad',
        }}
      />
    </Stack.Navigator>
  );
}