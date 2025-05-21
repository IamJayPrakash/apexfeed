'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import CreateBlogForm from '@/components/CreateBlogForm';

export default function CreateBlogPage() {
  return (
    <ProtectedRoute>
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Create New Blog</h1>
        <CreateBlogForm />
      </div>
    </ProtectedRoute>
  );
} 