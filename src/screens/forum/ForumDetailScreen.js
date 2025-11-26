/**
 * Forum Detail Screen
 * Pantalla para mostrar posts de un foro
 */

import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ForumContext } from '../../context';
import { PostCard } from '../../components/forum';
import CustomButton from '../../components/common/CustomButton';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ForumDetailScreen = ({ navigation }) => {
  const { selectedForum, posts, loading, fetchPosts, selectPost, deletePost } = useContext(ForumContext);

  useEffect(() => {
    if (selectedForum) {
      fetchPosts(selectedForum.id);
    }
  }, [selectedForum]);

  const handleCreatePost = () => {
    navigation.navigate('CreatePost');
  };

  const handleSelectPost = (post) => {
    selectPost(post);
    navigation.navigate('PostDetail');
  };

  const handleDeletePost = (postId) => {
    // Aquí iría confirmación
    deletePost(postId);
  };

  if (loading) {
    return <LoadingSpinner message="Cargando publicaciones..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.forumName}>{selectedForum?.name}</Text>
        <Text style={styles.forumDesc} numberOfLines={2}>{selectedForum?.description}</Text>
      </View>

      <CustomButton
        title="+ Crear Publicación"
        onPress={handleCreatePost}
        size="large"
        style={styles.createButton}
      />

      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPress={() => handleSelectPost(item)}
            onDelete={() => handleDeletePost(item.id)}
            isAuthor={true} // Aquí iría lógica real de autor
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay publicaciones aún</Text>
          </View>
        }
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
    paddingBottom: 12,
  },
  forumName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  forumDesc: {
    fontSize: 13,
    color: '#6b7280',
  },
  createButton: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
  },
});

export default ForumDetailScreen;
