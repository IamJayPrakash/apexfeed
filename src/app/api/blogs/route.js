import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const search = searchParams.get('search');

    await connectDB();

    if (id) {
      const blog = await Blog.findById(id).populate('author', 'name email image');
      if (!blog) {
        return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
      }
      return NextResponse.json(blog);
    }

    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } }
        ]
      };
    }

    const blogs = await Blog.find(query)
      .populate('author', 'name email image')
      .sort({ createdAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error in GET /api/blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { title, content, tags, image } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    await connectDB();

    const blog = await Blog.create({
      title,
      content,
      tags: tags || [],
      image,
      author: session.user.id,
    });

    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error in POST /api/blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    await connectDB();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    if (blog.author.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await blog.deleteOne();
    return NextResponse.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 