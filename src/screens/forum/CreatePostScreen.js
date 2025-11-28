/**
 * Create Post Screen
 * Pantalla para crear una nueva publicación
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
import { ForumContext } from '../../context';
import { postSchema } from '../../services/validation';
import CustomInput from '../../components/forms/CustomInput';
import CustomButton from '../../components/common/CustomButton';
import ErrorMessage from '../../components/common/ErrorMessage';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';

const CreatePostScreen = ({ navigation }) => {
  const { selectedForum, createPost, loading, error, setError } = useContext(ForumContext);
  const [charCount, setCharCount] = useState(0);

  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: yupResolver(postSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const contentValue = watch('content');

  const onSubmit = async (data) => {
    try {
      await createPost({
        forumId: selectedForum.id,
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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Nueva Publicación</Text>
            <Text style={styles.forum}>{selectedForum?.name}</Text>
          </View>

          {error && (
            <ErrorMessage message={error} onDismiss={() => setError(null)} />
          )}

          <View style={styles.form}>
            <Controller
              control={control}
              name="title"
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  label="Título"
                  placeholder="¿Cuál es el tema?"
                  value={value}
                  onChangeText={onChange}
                  error={errors.title?.message}
                  maxLength={100}
                />
              )}
            />

            <Controller
              control={control}
              name="content"
              render={({ field: { value, onChange } }) => (
                <>
                  <View style={styles.contentLabel}>
                    <Text style={styles.label}>Contenido (10-300 caracteres)</Text>
                    <Text style={styles.charCount}>{value.length}/300</Text>
                  </View>
                  <CustomInput
                    placeholder="Comparte tus pensamientos..."
                    value={value}
                    onChangeText={onChange}
                    error={errors.content?.message}
                    maxLength={300}
                  />
                </>
              )}
            />

            <Text style={styles.hint}>💡 Puedes usar emojis y caracteres especiales</Text>

            <CustomButton
              title="Publicar"
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
    marginBottom: 4,
  },
  forum: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '600',
  },
  form: {
    marginBottom: 16,
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

export default CreatePostScreen;
