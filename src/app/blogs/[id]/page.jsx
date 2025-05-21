'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';
import { stripHtmlTags } from '@/utils/stripHtml';

export default function BlogDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Blog not found');
          } else {
            throw new Error('Failed to fetch blog');
          }
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      router.push('/');
    } catch (err) {
      alert('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-600">Error</h1>
          <p className="text-gray-600">{error}</p>
          <Button onClick={() => router.push('/')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Blog Not Found</h1>
          <Button onClick={() => router.push('/')} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const isAuthor = session?.user?.id === blog.author?._id;

  return (
    <article className="max-w-4xl px-4 py-8 mx-auto">
      {blog.image && (
        <div className="relative w-full h-[300px] sm:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="text-3xl font-bold sm:text-4xl">{blog.title}</h1>
          {isAuthor && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push(`/blogs/edit/${blog._id}`)}
              >
                <Pencil className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            {blog.author?.image && (
              <div className="relative w-8 h-8 overflow-hidden rounded-full">
                <Image
                  src={blog.author.image}
                  alt={blog.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <Link
              href={`/profile/${blog.author?._id}`}
              className="transition-colors hover:text-gray-900"
            >
              By {blog.author?.name || 'Anonymous'}
            </Link>
          </div>
          <span>•</span>
          <time dateTime={blog.createdAt}>
            {new Date(blog.createdAt).toLocaleDateString()}
          </time>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="mt-8 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}  
        >
        </div>
      </div>
    </article>
  );
} 