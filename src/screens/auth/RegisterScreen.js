/**
 * Register Screen
 * Pantalla para crear cuenta
 */

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context';
import { registerSchema } from '../../services/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';

const RegisterScreen = ({ navigation }) => {
  const { register, loading, error, setError } = useContext(AuthContext);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: '',
      termsAccepted: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      await register(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>TheHeartCloud</Text>
        </View>

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { value, onChangeText } }) => (
              <CustomInput
                label="Nombre (5-15 caracteres)"
                placeholder="Tu nombre"
                value={value}
                onChangeText={onChangeText}
                error={errors.name?.message}
                maxLength={15}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChangeText } }) => (
              <CustomInput
                label="Correo Electrónico"
                placeholder="tu@correo.com"
                value={value}
                onChangeText={onChangeText}
                error={errors.email?.message}
                keyboardType="email-address"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChangeText } }) => (
              <CustomInput
                label="Contraseña (8-16 caracteres)"
                placeholder="Crea una contraseña segura"
                value={value}
                onChangeText={onChangeText}
                error={errors.password?.message}
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { value, onChangeText } }) => (
              <CustomInput
                label="Confirmar Contraseña"
                placeholder="Confirma tu contraseña"
                value={value}
                onChangeText={onChangeText}
                error={errors.confirmPassword?.message}
                secureTextEntry
              />
            )}
          />

          <Controller
            control={control}
            name="securityQuestion"
            render={({ field: { value, onChangeText } }) => (
              <CustomInput
                label="Pregunta de Seguridad"
                placeholder="¿Cuál es tu película favorita?"
                value={value}
                onChangeText={onChangeText}
                error={errors.securityQuestion?.message}
                maxLength={100}
              />
            )}
          />

          <Controller
            control={control}
            name="securityAnswer"
            render={({ field: { value, onChangeText } }) => (
              <CustomInput
                label="Respuesta de Seguridad"
                placeholder="Tu respuesta (sin acentos)"
                value={value}
                onChangeText={onChangeText}
                error={errors.securityAnswer?.message}
                maxLength={60}
              />
            )}
          />

          <TouchableOpacity 
            style={styles.termsContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <View style={[styles.checkbox, termsAccepted && styles.checkboxChecked]}>
              {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.termsText}>
              <Text style={styles.termsLabel}>Acepto los </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
                <Text style={styles.link}>términos y condiciones</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {errors.termsAccepted && (
            <Text style={styles.error}>{errors.termsAccepted.message}</Text>
          )}

          <CustomButton
            title="Crear Cuenta"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            size="large"
            disabled={!termsAccepted}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿Ya tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Inicia sesión aquí</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  form: {
    marginBottom: 24,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  termsText: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  termsLabel: {
    fontSize: 13,
    color: '#374151',
  },
  link: {
    color: '#3b82f6',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  error: {
    color: '#ef4444',
    fontSize: 12,
    marginBottom: 12,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 14,
    marginBottom: 8,
  },
  loginLink: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default RegisterScreen;
