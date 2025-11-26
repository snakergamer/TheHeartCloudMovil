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
        <View>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.author}>Por {post.author?.name || 'Anónimo'}</Text>
        </View>
        {isAuthor && (
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.deleteButton}>⋮</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.content} numberOfLines={2}>{post.content}</Text>

      <View style={styles.footer}>
        <Text style={styles.stat}>❤️ {post.likes || 0}</Text>
        <Text style={styles.stat}>💬 {post.commentsCount || 0}</Text>
        <Text style={styles.date}>{post.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    maxWidth: '90%',
  },
  author: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
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
