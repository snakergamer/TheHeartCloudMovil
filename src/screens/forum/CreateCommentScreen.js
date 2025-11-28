/**
 * Create Comment Screen
 * Pantalla para crear un comentario
 */

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ForumContext } from '../../context';
import { commentSchema } from '../../services/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';

const CreateCommentScreen = ({ navigation, route }) => {
  const { selectedPost, createComment, loading, error, setError } = useContext(ForumContext);

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      content: '',
    },
  });

  const contentValue = watch('content');

  const onSubmit = async (data) => {
    try {
      await createComment({
        postId: selectedPost.id,
        ...data,
      });
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
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Nuevo Comentario</Text>
          </View>

          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}

          <View style={styles.postBox}>
            <Text style={styles.postTitle} numberOfLines={1}>{selectedPost?.title}</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <>
                  <View style={styles.contentLabel}>
                    <Text style={styles.label}>Tu comentario (5-150 caracteres)</Text>
                    <Text style={styles.charCount}>{value.length}/150</Text>
                  </View>
                  <CustomInput
                    placeholder="Comparte tu opinión..."
                    value={value}
                    onChangeText={onChange}
                    error={errors.content?.message}
                    maxLength={150}
                  />
                </>
              )}
            />

            <Text style={styles.hint}>💬 Puedes usar emojis</Text>

            <CustomButton
              title="Enviar Comentario"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              size="large"
            />
          </View>
        </View>
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
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
  },
  postBox: {
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#0284c7',
    padding: 12,
    borderRadius: 4,
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 13,
    color: '#0c4a6e',
    fontWeight: '600',
  },
  form: {
    flex: 1,
  },
  contentLabel: {
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
  hint: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 16,
    fontStyle: 'italic',
  },
});

export default CreateCommentScreen;
