import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  image: {
    type: String,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
