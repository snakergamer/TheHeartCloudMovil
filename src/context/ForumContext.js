/**
 * Forum Context
 * Contexto global para gestión de foros, posts y comentarios con Firebase
 */

import React, { createContext, useReducer, useCallback } from 'react';
import { forumService, postService, commentService } from '../services/firebase/firestoreService';

export const ForumContext = createContext();

const initialState = {
  forums: [],
  selectedForum: null,
  posts: [],
  selectedPost: null,
  comments: [],
  loading: false,
  error: null,
};

const forumReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_FORUMS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_FORUMS_SUCCESS':
      return { ...state, forums: action.payload, loading: false };
    case 'FETCH_FORUMS_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'SELECT_FORUM':
      return { ...state, selectedForum: action.payload, posts: [] };

    case 'FETCH_POSTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_POSTS_SUCCESS':
      return { ...state, posts: action.payload, loading: false };
    case 'FETCH_POSTS_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'CREATE_POST_REQUEST':
      return { ...state, loading: true };
    case 'CREATE_POST_SUCCESS':
      return { ...state, posts: [action.payload, ...state.posts], loading: false };
    case 'CREATE_POST_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'DELETE_POST_SUCCESS':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.payload),
      };

    case 'SELECT_POST':
      return { ...state, selectedPost: action.payload, comments: [] };

    case 'FETCH_COMMENTS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_COMMENTS_SUCCESS':
      return { ...state, comments: action.payload, loading: false };
    case 'FETCH_COMMENTS_ERROR':
      return { ...state, error: action.payload, loading: false };

    case 'CREATE_COMMENT_SUCCESS':
      return { ...state, comments: [action.payload, ...state.comments] };

    case 'DELETE_COMMENT_SUCCESS':
      return {
        ...state,
        comments: (state.comments || []).filter((c) => c.id !== action.payload),
      };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const ForumProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forumReducer, initialState);

  const fetchForums = useCallback(async () => {
    dispatch({ type: 'FETCH_FORUMS_REQUEST' });
    try {
      const forums = await forumService.getAll();
      dispatch({ type: 'FETCH_FORUMS_SUCCESS', payload: forums });
    } catch (error) {
      dispatch({ type: 'FETCH_FORUMS_ERROR', payload: error.message });
    }
  }, []);

  const selectForum = useCallback((forum) => {
    dispatch({ type: 'SELECT_FORUM', payload: forum });
  }, []);

  const fetchPosts = useCallback(async (forumId) => {
    dispatch({ type: 'FETCH_POSTS_REQUEST' });
    try {
      const posts = await postService.getByForum(forumId);
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: posts });
    } catch (error) {
      dispatch({ type: 'FETCH_POSTS_ERROR', payload: error.message });
    }
  }, []);

  const createPost = useCallback(async (postData) => {
    dispatch({ type: 'CREATE_POST_REQUEST' });
    try {
      const newPost = await postService.create(postData);
      dispatch({ type: 'CREATE_POST_SUCCESS', payload: newPost });
    } catch (error) {
      dispatch({ type: 'CREATE_POST_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const deletePost = useCallback(async (postId) => {
    try {
      await postService.delete(postId);
      dispatch({ type: 'DELETE_POST_SUCCESS', payload: postId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const selectPost = useCallback((post) => {
    dispatch({ type: 'SELECT_POST', payload: post });
  }, []);

  const fetchComments = useCallback(async (postId) => {
    dispatch({ type: 'FETCH_COMMENTS_REQUEST' });
    try {
      const comments = await commentService.getByPost(postId);
      dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: comments });
    } catch (error) {
      dispatch({ type: 'FETCH_COMMENTS_ERROR', payload: error.message });
    }
  }, []);

  const createComment = useCallback(async (commentData) => {
    try {
      const newComment = await commentService.create(commentData);
      dispatch({ type: 'CREATE_COMMENT_SUCCESS', payload: newComment });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const deleteComment = useCallback(async (commentId, postId) => {
    try {
      await commentService.delete(commentId, postId);
      dispatch({ type: 'DELETE_COMMENT_SUCCESS', payload: commentId });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const value = {
    ...state,
    fetchForums,
    selectForum,
    fetchPosts,
    createPost,
    deletePost,
    selectPost,
    fetchComments,
    createComment,
    deleteComment,
    setError,
  };

  return <ForumContext.Provider value={value}>{children}</ForumContext.Provider>;
};
