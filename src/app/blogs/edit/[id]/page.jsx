'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import CreateBlogForm from '@/components/CreateBlogForm';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function EditBlog() {
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
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch blog');
        }

        // Check if user is the author
        if (data.author._id !== session?.user?.id) {
          router.push('/');
          return;
        }

        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      fetchBlog();
    }
  }, [id, session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Not Found</h2>
          <p>The blog you're looking for doesn't exist or you don't have permission to edit it.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Blog</h1>
      <CreateBlogForm 
        initialData={blog}
        isEditing={true}
      />
    </div>
  );
} 