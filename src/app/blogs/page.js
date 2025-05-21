"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { sampleBlogs } from "@/utils/constants";
import LoadingSpinner from "@/components/LoadingSpinner";
import { stripHtmlTags } from "@/utils/stripHtml";

export default function BlogsPage() {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data.length > 0 ? data : sampleBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs(sampleBlogs);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  let blogsContent;
  if (loading) {
    blogsContent = (
      <div className="py-20 text-center">
        <LoadingSpinner />
      </div>
    );
  } else if (blogs.length === 0) {
    blogsContent = <div className="py-20 text-center">No blogs found.</div>;
  } else {
    blogsContent = (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <Link
            key={`${blog._id}-${index}`}
            href={`/blogs/${blog._id}`}
            className="overflow-hidden transition-shadow duration-300 rounded-lg shadow-lg group bg-card hover:shadow-xl"
          >
            {(blog.image ||
              `https://picsum.photos/seed/${blog._id}/800/600`) && (
              <div className="relative w-full h-48">
                <Image
                  src={
                    blog.image ||
                    `https://picsum.photos/seed/${blog._id}/800/600`
                  }
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-6">
              <h2 className="mb-2 text-xl font-semibold transition-colors text-foreground group-hover:text-primary">
                {blog.title}
              </h2>
              <p className="text-muted-foreground line-clamp-3">
                {stripHtmlTags(blog.content)}
              </p>
              <div className="mt-4 text-sm text-muted-foreground">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {blog.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags?selected=${encodeURIComponent(tag)}`}
                      className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground hover:underline"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={[]} />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Latest Blogs</h1>
        <div className="flex gap-2">
          {session && (
            <Link href="/blogs/create">
              <Button>Create Blog</Button>
            </Link>
          )}
          <Link href="/tags">
            <Button variant="outline">Browse Tags</Button>
          </Link>
        </div>
      </div>
      {blogsContent}
    </div>
  );
}
