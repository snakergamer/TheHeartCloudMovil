/**
 * User Model
 * Representa un usuario en la aplicación
 */
const User = {
  id: String,
  email: String,
  name: String,
  avatar: String,
  bio: String,
  postsCount: Number,
  forumsJoined: Array,
  createdAt: String,
  updatedAt: String,
};

export default User;
