/**
 * Forgot Password Screen
 * Pantalla para recuperar contraseña
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
import {
  forgotPasswordSchema,
  securityAnswerSchema,
  newPasswordSchema,
} from '../../services/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';

const ForgotPasswordScreen = ({ navigation }) => {
  const { loading, error, setError } = useContext(AuthContext);
  const [step, setStep] = useState(1); // 1: email, 2: security question, 3: new password
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');

  // Step 1: Email verification
  const emailForm = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  // Step 2: Security answer
  const answerForm = useForm({
    resolver: yupResolver(securityAnswerSchema),
  });

  // Step 3: New password
  const passwordForm = useForm({
    resolver: yupResolver(newPasswordSchema),
  });

  const onEmailSubmit = async (data) => {
    try {
      // Aquí se llamaría a servicio para verificar email y obtener pregunta
      setEmail(data.email);
      setSecurityQuestion('¿Cuál es tu película favorita?'); // Simulado
      setStep(2);
    } catch (err) {
      setError(err.message);
    }
  };

  const onAnswerSubmit = async (data) => {
    try {
      // Aquí se llamaría a servicio para verificar respuesta
      setStep(3);
    } catch (err) {
      setError(err.message);
    }
  };

  const onPasswordSubmit = async (data) => {
    try {
      // Aquí se llamaría a servicio para cambiar contraseña
      setError(null);
      navigation.navigate('Login');
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
          <Text style={styles.title}>Recuperar Contraseña</Text>
          <Text style={styles.step}>Paso {step} de 3</Text>
        </View>

        {error && (
          <ErrorMessage message={error} onDismiss={() => setError(null)} />
        )}

        {/* Step 1: Email */}
        {step === 1 && (
          <View style={styles.form}>
            <Text style={styles.stepTitle}>Ingresa tu correo electrónico</Text>
            <Controller
              control={emailForm.control}
              name="email"
              render={({ field: { value, onChangeText } }) => (
                <CustomInput
                  label="Correo Electrónico"
                  placeholder="tu@correo.com"
                  value={value}
                  onChangeText={onChangeText}
                  error={emailForm.formState.errors.email?.message}
                  keyboardType="email-address"
                />
              )}
            />
            <CustomButton
              title="Continuar"
              onPress={emailForm.handleSubmit(onEmailSubmit)}
              loading={loading}
              size="large"
            />
          </View>
        )}

        {/* Step 2: Security Question */}
        {step === 2 && (
          <View style={styles.form}>
            <Text style={styles.stepTitle}>Responde tu pregunta de seguridad</Text>
            <View style={styles.questionBox}>
              <Text style={styles.questionText}>{securityQuestion}</Text>
            </View>
            <Controller
              control={answerForm.control}
              name="answer"
              render={({ field: { value, onChangeText } }) => (
                <CustomInput
                  label="Tu respuesta"
                  placeholder="Ingresa tu respuesta"
                  value={value}
                  onChangeText={onChangeText}
                  error={answerForm.formState.errors.answer?.message}
                />
              )}
            />
            <CustomButton
              title="Continuar"
              onPress={answerForm.handleSubmit(onAnswerSubmit)}
              loading={loading}
              size="large"
            />
          </View>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <View style={styles.form}>
            <Text style={styles.stepTitle}>Crea una nueva contraseña</Text>
            <Controller
              control={passwordForm.control}
              name="password"
              render={({ field: { value, onChangeText } }) => (
                <CustomInput
                  label="Nueva Contraseña"
                  placeholder="Contraseña segura"
                  value={value}
                  onChangeText={onChangeText}
                  error={passwordForm.formState.errors.password?.message}
                  secureTextEntry
                />
              )}
            />
            <Controller
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field: { value, onChangeText } }) => (
                <CustomInput
                  label="Confirmar Contraseña"
                  placeholder="Confirma tu contraseña"
                  value={value}
                  onChangeText={onChangeText}
                  error={passwordForm.formState.errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />
            <CustomButton
              title="Cambiar Contraseña"
              onPress={passwordForm.handleSubmit(onPasswordSubmit)}
              loading={loading}
              size="large"
            />
          </View>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backLink}>← Volver a Inicio de Sesión</Text>
        </TouchableOpacity>
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
    marginBottom: 32,
    marginTop: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  step: {
    fontSize: 13,
    color: '#9ca3af',
  },
  form: {
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 16,
  },
  questionBox: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 14,
    color: '#0c4a6e',
    fontWeight: '500',
  },
  backLink: {
    color: '#3b82f6',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
