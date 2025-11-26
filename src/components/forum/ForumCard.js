/**
 * Forum Card Component
 * Tarjeta para mostrar un foro
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ForumCard = ({ forum, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.category}>{forum.category}</Text>
        <Text style={styles.badge}>{forum.postsCount}</Text>
      </View>

      <Text style={styles.name}>{forum.name}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {forum.description}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.stat}>👥 {forum.membersCount} miembros</Text>
        <Text style={styles.stat}>📝 {forum.postsCount} posts</Text>
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
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 11,
    fontWeight: '600',
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ef4444',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 16,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default ForumCard;
