/**
 * Edit Profile Screen
 * Pantalla para editar perfil
 */

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AuthContext } from '../../context';
import { editProfileSchema } from '../../services/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateUser, loading, error, setError } = useContext(AuthContext);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateUser(data);
      navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Editar Perfil</Text>
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
              name="bio"
              render={({ field: { value, onChangeText } }) => (
                <>
                  <View style={styles.bioLabel}>
                    <Text style={styles.label}>Biografía (hasta 250 caracteres)</Text>
                    <Text style={styles.charCount}>{value.length}/250</Text>
                  </View>
                  <CustomInput
                    placeholder="Cuéntanos sobre ti..."
                    value={value}
                    onChangeText={onChangeText}
                    error={errors.bio?.message}
                    maxLength={250}
                  />
                </>
              )}
            />

            <CustomButton
              title="Guardar Cambios"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              size="large"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <MedicalDisclaimer visible={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  form: {
    marginBottom: 16,
  },
  bioLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  charCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default EditProfileScreen;
