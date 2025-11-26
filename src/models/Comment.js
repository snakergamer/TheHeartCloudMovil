/**
 * Comment Model
 * Representa un comentario en un post
 */
const Comment = {
  id: String,
  postId: String,
  content: String,
  author: {
    id: String,
    name: String,
    avatar: String,
  },
  likes: Number,
  createdAt: String,
  updatedAt: String,
};

export default Comment;
