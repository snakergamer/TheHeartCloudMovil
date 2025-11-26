/**
 * Forums Screen
 * Pantalla para mostrar lista de foros
 */

import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ForumContext } from '../../context';
import { ForumCard } from '../../components/forum';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ForumsScreen = ({ navigation }) => {
  const { forums, loading, fetchForums, selectForum } = useContext(ForumContext);

  useEffect(() => {
    fetchForums();
  }, []);

  const handleSelectForum = (forum) => {
    selectForum(forum);
    navigation.navigate('ForumDetail');
  };

  if (loading) {
    return <LoadingSpinner message="Cargando foros..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Foros</Text>
        <Text style={styles.subtitle}>Selecciona un foro para empezar</Text>
      </View>

      <FlatList
        data={forums}
        renderItem={({ item }) => (
          <ForumCard 
            forum={item} 
            onPress={() => handleSelectForum(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollIndicatorInsets={{ right: 1 }}
      />

      <MedicalDisclaimer visible={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
});

export default ForumsScreen;
