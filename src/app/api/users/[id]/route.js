import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const user = await User.findById(params.id).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Fetch blogs associated with this user
    const blogs = await Blog.find({ author: params.id })
      .sort({ createdAt: -1 });

    // Add blogs to the user object
    const userWithBlogs = {
      ...user.toObject(),
      blogs
    };

    return NextResponse.json(userWithBlogs);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Error fetching user' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.id !== params.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { name, email, bio, image } = await request.json();

    const user = await User.findByIdAndUpdate(
      params.id,
      { name, email, bio, image },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Error updating user' },
      { status: 500 }
    );
  }
} 