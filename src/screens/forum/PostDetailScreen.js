/**
 * Post Detail Screen
 * Pantalla para ver detalle de post y comentarios
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
import { CommentCard } from '../../components/forum';
import CustomButton from '../../components/common/CustomButton';
import MedicalDisclaimer from '../../components/common/MedicalDisclaimer';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const PostDetailScreen = ({ navigation }) => {
  const { selectedPost, comments, loading, fetchComments, deleteComment } = useContext(ForumContext);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
    }
  }, [selectedPost]);

  const handleCreateComment = () => {
    navigation.navigate('CreateComment', { postId: selectedPost.id });
  };

  const handleDeleteComment = (commentId) => {
    if (selectedPost?.id) {
      deleteComment(commentId, selectedPost.id);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Cargando..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={comments}
        renderItem={({ item }) => (
          <CommentCard
            comment={item}
            onDelete={() => handleDeleteComment(item.id)}
            isAuthor={true} // Aquí iría lógica real
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={styles.postBox}>
              <View style={styles.postHeader}>
                <View>
                  <Text style={styles.postTitle}>{selectedPost?.title}</Text>
                  <Text style={styles.postAuthor}>Por {selectedPost?.author?.name || 'Anónimo'}</Text>
                </View>
              </View>
              <Text style={styles.postContent}>{selectedPost?.content}</Text>
              <View style={styles.postStats}>
                <Text style={styles.stat}>❤️ {selectedPost?.likes || 0}</Text>
                <Text style={styles.stat}>💬 {selectedPost?.commentsCount || 0}</Text>
              </View>
            </View>

            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Comentarios ({comments.length})</Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay comentarios aún</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <CustomButton
          title="Agregar Comentario"
          onPress={handleCreateComment}
          size="large"
          style={styles.button}
        />
        <MedicalDisclaimer visible={true} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  postBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  postHeader: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  postAuthor: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  postContent: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 12,
    color: '#6b7280',
  },
  commentsHeader: {
    marginBottom: 12,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  button: {
    marginBottom: 8,
  },
});

export default PostDetailScreen;
