/**
 * Register Screen
 * Pantalla para crear cuenta
 */

import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context';
import { registerSchema } from '../../services/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';
import logo from '../../assets/images/illustrations/logoprincipal.png';

const RegisterScreen = ({ navigation }) => {
  const { register, loading, error, setError } = useContext(AuthContext);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await register(data);
    } catch (err) {
      // Error handled in context
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Únete a TheHeartCloud</Text>
        </View>

        <View style={styles.card}>
          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}

          <View style={styles.form}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Nombre"
                  placeholder="Tu nombre completo"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  maxLength={15}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Correo Electrónico"
                  placeholder="ejemplo@correo.com"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email?.message}
                  keyboardType="email-address"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Contraseña"
                  placeholder="••••••••"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password?.message}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Confirmar Contraseña"
                  placeholder="••••••••"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                />
              )}
            />

            <Controller
              control={control}
              name="securityQuestion"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Pregunta de Seguridad"
                  placeholder="¿Cuál es tu película favorita?"
                  value={value}
                  onChangeText={onChange}
                  error={errors.securityQuestion?.message}
                  maxLength={100}
                />
              )}
            />

            <Controller
              control={control}
              name="securityAnswer"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Respuesta"
                  placeholder="Tu respuesta"
                  value={value}
                  onChangeText={onChange}
                  error={errors.securityAnswer?.message}
                  maxLength={60}
                />
              )}
            />

            <View style={styles.buttonContainer}>
              <CustomButton
                title="Crear Cuenta"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                size="large"
              />
            </View>
          </View>
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
    backgroundColor: '#f3f4f6',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#eff6ff',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    padding: 10,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 14,
    marginRight: 4,
  },
  loginLink: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '700',
  },
});

export default RegisterScreen;
