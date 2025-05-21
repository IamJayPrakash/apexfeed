'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useDropzone } from 'react-dropzone';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import RichTextEditor from './RichTextEditor';
import Image from 'next/image';

export default function CreateBlogForm({ initialData = null, isEditing = false }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState(initialData?.title || '');
  const [tags, setTags] = useState(initialData?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [image, setImage] = useState(initialData?.image || null);
  const [content, setContent] = useState(initialData?.content || '');
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
  });

  const handleAddTag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error('Please sign in to create a blog');
      return;
    }

    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!content) {
      toast.error('Content is required');
      return;
    }

    setLoading(true);
    try {
      const blogData = {
        title,
        content,
        tags,
        image,
        author: session.user.id,
      };

      const response = await fetch(
        isEditing ? `/api/blogs/${initialData._id}` : '/api/blogs',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save blog');
      }

      toast.success(isEditing ? 'Blog updated successfully' : 'Blog created successfully');
      router.push(`/blogs/${data._id}`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div>
        <Input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold"
        />
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded-full"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            type="text"
            placeholder="Add tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag(e);
              }
            }}
          />
          <Button type="button" onClick={handleAddTag} className="sm:w-auto">
            Add Tag
          </Button>
        </div>
      </div>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input {...getInputProps()} />
        {image ? (
          <div className="relative">
            <Image
              src={image}
              alt="Preview"
              className="mx-auto rounded-lg max-h-64"
              width={1000}
              height={1000}
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setImage(null);
              }}
              className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <p className="text-gray-600">
              Drag and drop an image here, or click to select
            </p>
          </div>
        )}
      </div>

      <RichTextEditor content={content} onChange={setContent} />

      <div className="flex flex-col justify-end gap-4 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading} className="w-full sm:w-auto">
          {loading ? 'Saving...' : isEditing ? 'Update Blog' : 'Create Blog'}
        </Button>
      </div>
    </form>
  );
} 