import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all'; // 'all', 'content', 'tags', 'author'

    if (!query) {
      return NextResponse.json({ error: 'Search query is required' }, { status: 400 });
    }

    await connectDB();

    let searchQuery = {};
    const searchRegex = new RegExp(query, 'i');

    switch (type) {
      case 'content':
        searchQuery = { content: searchRegex };
        break;
      case 'tags':
        searchQuery = { tags: searchRegex };
        break;
      case 'author':
        searchQuery = { 'author.name': searchRegex };
        break;
      default:
        searchQuery = {
          $or: [
            { title: searchRegex },
            { content: searchRegex },
            { tags: searchRegex },
            { 'author.name': searchRegex }
          ]
        };
    }

    const blogs = await Blog.find(searchQuery)
      .populate('author', 'name email image')
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error in search blogs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 