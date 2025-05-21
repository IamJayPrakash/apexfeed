'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { stripHtmlTags } from '@/utils/helpers';

export default function SearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchBlogs = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `/api/blogs/search?q=${encodeURIComponent(query)}&type=${searchType}`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error searching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchBlogs, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, searchType]);

  const handleResultClick = (blogId) => {
    router.push(`/blogs/${blogId}`);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Blogs</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="tags">Tags</SelectItem>
                <SelectItem value="author">Author</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="py-8 text-center text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                {results.map((blog) => (
                  <div
                    key={blog._id}
                    className="p-4 transition-colors rounded-lg cursor-pointer hover:bg-muted"
                    onClick={() => handleResultClick(blog._id)}
                  >
                    <h3 className="font-semibold">{blog.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {stripHtmlTags(blog.content)}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <span>By {blog.author?.name || 'Anonymous'}</span>
                      <span>•</span>
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : query ? (
              <div className="py-8 text-center text-muted-foreground">
                No results found
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 