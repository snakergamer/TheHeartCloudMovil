/**
 * Comment Card Component
 * Tarjeta para mostrar un comentario
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const CommentCard = ({ comment, onDelete, isAuthor }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.author}>{comment.author?.name || 'Anónimo'}</Text>
          <Text style={styles.date}>
            {comment.createdAt?.toDate ? comment.createdAt.toDate().toLocaleDateString() : ''}
          </Text>
        </View>
        {isAuthor && (
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.deleteButton}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.content}>{comment.content}</Text>

      <View style={styles.footer}>
        <Text style={styles.like}>❤️ {comment.likes || 0}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  author: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  date: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  deleteButton: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
  },
  content: {
    fontSize: 13,
    color: '#4b5563',
    lineHeight: 18,
  },
  footer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  like: {
    fontSize: 12,
    color: '#6b7280',
  },
});

export default CommentCard;
