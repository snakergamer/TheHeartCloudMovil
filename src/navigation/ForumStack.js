

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  ForumsScreen,
  ForumDetailScreen,
  CreatePostScreen,
  PostDetailScreen,
  CreateCommentScreen,
} from '../screens/forum';

const Stack = createNativeStackNavigator();

const ForumStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3b82f6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Stack.Screen 
        name="Forums" 
        component={ForumsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="ForumDetail" 
        component={ForumDetailScreen}
        options={({ route }) => ({
          title: route.params?.forumName || 'Foro',
        })}
      />
      <Stack.Screen 
        name="CreatePost" 
        component={CreatePostScreen}
        options={{
          title: 'Nueva Publicación',
        }}
      />
      <Stack.Screen 
        name="PostDetail" 
        component={PostDetailScreen}
        options={{
          title: 'Publicación',
        }}
      />
      <Stack.Screen 
        name="CreateComment" 
        component={CreateCommentScreen}
        options={{
          title: 'Nuevo Comentario',
        }}
      />
    </Stack.Navigator>
  );
};

export default ForumStack;
