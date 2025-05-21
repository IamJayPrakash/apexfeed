"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/LoadingSpinner";
import { stripHtmlTags } from "@/utils/stripHtml";

export default function Home() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

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
        </div>
      </div>
    );
  }

  return (
    <main className="px-4 py-8 mx-auto max-w-7xl">
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Latest Blogs</h1>
        <div className="flex gap-2">
          {session && (
            <Button asChild>
              <Link href="/blogs/create">Create Blog</Link>
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/tags">Browse Tags</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-16">
        {blogs.map((blog, index) => (
          <article
            key={blog._id}
            className={`flex flex-col ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            } gap-8 items-center`}
          >
            <div className="w-full sm:w-1/2">
              {(blog.image ||
                `https://picsum.photos/seed/${blog._id}/800/600`) && (
                <div className="relative w-full h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                  <Image
                    src={
                      blog.image ||
                      `https://picsum.photos/seed/${blog._id}/800/600`
                    }
                    alt={blog.title || "Blog post image"}
                    fill
                    className="object-cover"
                    priority={index < 2}
                    unoptimized={!blog.image}
                  />
                </div>
              )}
            </div>

            <div className="w-full space-y-4 sm:w-1/2">
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  {blog.author?.image && (
                    <div className="relative w-8 h-8 overflow-hidden rounded-full">
                      <Image
                        src={blog.author.image}
                        alt={blog.author.name || "Author"}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <Link
                    href={`/profile/${blog.author?._id}`}
                    className="transition-colors hover:text-gray-900"
                  >
                    By {blog.author?.name || "Anonymous"}
                  </Link>
                </div>
                <span>•</span>
                <time dateTime={blog.createdAt}>
                  {new Date(blog.createdAt).toLocaleDateString()}
                </time>
              </div>

              <h2 className="text-2xl font-bold sm:text-3xl">
                <Link
                  href={`/blogs/${blog._id}`}
                  className="transition-colors hover:text-gray-600"
                >
                  {blog.title}
                </Link>
              </h2>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags?selected=${encodeURIComponent(tag)}`}
                      className="px-3 py-1 text-sm text-gray-800 bg-gray-100 rounded-full hover:underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}

              <div
                className="prose-sm prose sm:prose-base max-w-none line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: stripHtmlTags(blog.content),
                }}
              />

              <Button asChild variant="outline">
                <Link href={`/blogs/${blog._id}`}>Read More</Link>
              </Button>
            </div>
          </article>
        ))}

        {blogs.length === 0 && (
          <div className="py-16 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              No Blogs Yet
            </h2>
            <p className="mb-8 text-gray-600">
              Be the first to share your thoughts and experiences!
            </p>
            {session ? (
              <Button asChild>
                <Link href="/blogs/create">Create Your First Blog</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href="/auth/login">Sign In to Create</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
