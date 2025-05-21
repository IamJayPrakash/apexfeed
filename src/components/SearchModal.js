"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/blogs?search=${encodeURIComponent(query)}`);
        if (!res.ok) {
          throw new Error('Failed to fetch results');
        }
        const blogs = await res.json();
        setResults(blogs);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Search Blogs</DialogTitle>
        </DialogHeader>
        <Input
          autoFocus
          placeholder="Search by title, content, or #tag..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full"
        />
        <div className="mt-4 max-h-64 overflow-y-auto">
          {isLoading && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin" />
            </div>
          )}
          {!isLoading && results.length === 0 && query.length > 1 && (
            <div className="text-center text-muted-foreground py-4">No results found.</div>
          )}
          {!isLoading && results.map(blog => (
            <Link
              key={blog._id}
              href={`/blogs/${blog._id}`}
              className="block py-2 px-3 rounded hover:bg-accent"
              onClick={onClose}
            >
              <div className="font-semibold">{blog.title}</div>
              <div className="text-xs text-muted-foreground line-clamp-1">
                {blog.tags?.join(", ")}
              </div>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
