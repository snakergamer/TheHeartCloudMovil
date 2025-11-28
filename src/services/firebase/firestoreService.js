/**
 * Firebase Firestore Service
 * Servicios para gestionar datos en Firestore
 */

import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './config';

// ============= FORUMS =============

export const forumService = {
  getAll: async () => {
    try {
      const forumsRef = collection(db, 'forums');
      const q = query(forumsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching forums:', error);
      throw error;
    }
  },

  getById: async (forumId) => {
    try {
      const forumRef = doc(db, 'forums', forumId);
      const snapshot = await getDoc(forumRef);
      return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
      console.error('Error fetching forum:', error);
      throw error;
    }
  },

  create: async (forumData) => {
    try {
      const forumsRef = collection(db, 'forums');
      const docRef = await addDoc(forumsRef, {
        ...forumData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...forumData };
    } catch (error) {
      console.error('Error creating forum:', error);
      throw error;
    }
  },

  update: async (forumId, forumData) => {
    try {
      const forumRef = doc(db, 'forums', forumId);
      await updateDoc(forumRef, {
        ...forumData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating forum:', error);
      throw error;
    }
  },

  delete: async (forumId) => {
    try {
      const forumRef = doc(db, 'forums', forumId);
      await deleteDoc(forumRef);
    } catch (error) {
      console.error('Error deleting forum:', error);
      throw error;
    }
  },
};

// ============= POSTS =============

export const postService = {
  getByForum: async (forumId) => {
    try {
      const postsRef = collection(db, 'posts');
      const q = query(postsRef, where('forumId', '==', forumId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  getById: async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const snapshot = await getDoc(postRef);
      return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  create: async (postData) => {
    try {
      const postsRef = collection(db, 'posts');
      const docRef = await addDoc(postsRef, {
        ...postData,
        likes: 0,
        commentsCount: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...postData };
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  update: async (postId, postData) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        ...postData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  delete: async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  },

  likePost: async (postId, currentLikes) => {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: currentLikes + 1,
      });
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },
};

// ============= COMMENTS =============

export const commentService = {
  getByPost: async (postId) => {
    try {
      const commentsRef = collection(db, 'comments');
      const q = query(commentsRef, where('postId', '==', postId), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  create: async (commentData) => {
    try {
      const commentsRef = collection(db, 'comments');
      const docRef = await addDoc(commentsRef, {
        ...commentData,
        likes: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Actualizar conteo de comentarios en el post
      const postRef = doc(db, 'posts', commentData.postId);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        await updateDoc(postRef, {
          commentsCount: (postDoc.data().commentsCount || 0) + 1,
        });
      }

      return { id: docRef.id, ...commentData };
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  delete: async (commentId, postId) => {
    try {
      const commentRef = doc(db, 'comments', commentId);
      await deleteDoc(commentRef);

      // Actualizar conteo de comentarios en el post
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        await updateDoc(postRef, {
          commentsCount: Math.max((postDoc.data().commentsCount || 1) - 1, 0),
        });
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },

  likeComment: async (commentId, currentLikes) => {
    try {
      const commentRef = doc(db, 'comments', commentId);
      await updateDoc(commentRef, {
        likes: currentLikes + 1,
      });
    } catch (error) {
      console.error('Error liking comment:', error);
      throw error;
    }
  },
};

// ============= USERS =============

export const userService = {
  create: async (uid, userData) => {
    try {
      const userRef = doc(db, 'users', uid);
      await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  getById: async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const snapshot = await getDoc(userRef);
      return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  update: async (uid, userData) => {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },

  delete: async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      await deleteDoc(userRef);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  },
};
