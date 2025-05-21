"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useSearchParams } from "next/navigation";

export default function TagsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      }
    >
      <TagsClient />
    </Suspense>
  );
}

function TagsClient() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/tags");
        const data = await res.json();
        setTags(data);
      } catch {
        setTags([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const selected = searchParams.get("selected");
    if (selected && tags.length > 0) {
      handleTagClick(selected);
    }
    // eslint-disable-next-line
  }, [tags, searchParams]);

  const handleTagClick = async (tag) => {
    setSelectedTag(tag);
    setBlogsLoading(true);
    try {
      const res = await fetch(`/api/blogs?search=${encodeURIComponent(tag)}`);
      const data = await res.json();
      setBlogs(data);
    } catch {
      setBlogs([]);
    } finally {
      setBlogsLoading(false);
    }
  };

  let blogsContent;
  if (blogsLoading) {
    blogsContent = (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  } else if (blogs.length === 0) {
    blogsContent = (
      <div className="text-muted-foreground text-center">
        No blogs found for this tag.
      </div>
    );
  } else {
    blogsContent = (
      <div className="grid gap-6 md:grid-cols-2">
        {blogs.map((blog) => (
          <Card
            key={blog._id}
            className="p-4 flex flex-col gap-2 border border-primary/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <Link
              href={`/blogs/${blog._id}`}
              className="text-lg font-bold hover:underline text-primary"
            >
              {blog.title}
            </Link>
            <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {blog.content.replace(/<[^>]*>?/gm, "").slice(0, 120)}
            </div>
            <div className="flex gap-2 flex-wrap">
              {blog.tags?.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-muted px-2 py-1 rounded-full"
                >
                  #{t}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold mb-8 text-center tracking-tight text-primary">
        Tags
      </h1>
      {loading ? (
        <div className="flex justify-center py-16">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {tags.map(({ tag, count }) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => handleTagClick(tag)}
              className="rounded-full px-6 py-2 text-base font-medium shadow-sm border border-primary/20 hover:bg-primary/10 transition-colors"
            >
              #{tag}{" "}
              <span className="ml-2 text-xs text-muted-foreground">
                ({count})
              </span>
            </Button>
          ))}
        </div>
      )}
      {selectedTag && (
        <div className="bg-card rounded-xl shadow-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4 text-primary">
            Blogs with <span className="text-accent">#{selectedTag}</span>
          </h2>
          {blogsContent}
        </div>
      )}
    </div>
  );
}
