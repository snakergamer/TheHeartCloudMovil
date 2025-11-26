/**
 * Post Model
 * Representa un post en un foro
 */
const Post = {
  id: String,
  forumId: String,
  title: String,
  content: String,
  author: {
    id: String,
    name: String,
    avatar: String,
  },
  likes: Number,
  commentsCount: Number,
  createdAt: String,
  updatedAt: String,
};

export default Post;
