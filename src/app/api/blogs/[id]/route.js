import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }

    const blog = await Blog.findById(params.id)
      .populate('author', 'name email image')
      .lean();

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to update this blog' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, content, tags, image } = body;

    // Update blog fields
    blog.title = title;
    blog.content = content;
    blog.tags = tags;
    blog.image = image;

    await blog.save();

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const blog = await Blog.findById(params.id);

    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if user is the author
    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this blog' },
        { status: 403 }
      );
    }

    await blog.deleteOne();
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
} 