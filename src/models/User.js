import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  bio: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', userSchema); 