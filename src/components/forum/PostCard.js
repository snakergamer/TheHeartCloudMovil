/**
 * Post Card Component
 * Tarjeta para mostrar un post
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const PostCard = ({ post, onPress, onDelete, isAuthor }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.author}>Por {post.author?.name || 'Anónimo'}</Text>
        </View>
        {isAuthor && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteContainer}>
            <Text style={styles.deleteButton}>🗑️</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.content} numberOfLines={2}>{post.content}</Text>

      <View style={styles.footer}>
        <Text style={styles.stat}>❤️ {post.likes || 0}</Text>
        <Text style={styles.stat}>💬 {post.commentsCount || 0}</Text>
        <Text style={styles.date}>
          {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString() : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  author: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  deleteContainer: {
    paddingLeft: 8,
  },
  deleteButton: {
    fontSize: 20,
    color: '#9ca3af',
  },
  content: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 12,
    color: '#6b7280',
  },
  date: {
    fontSize: 11,
    color: '#9ca3af',
  },
});

export default PostCard;
