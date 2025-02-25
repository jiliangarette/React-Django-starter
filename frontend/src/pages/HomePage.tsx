import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Post, postsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PostForm from "@/components/PostForm";

export default function HomePage() {
  const [isCreating, setIsCreating] = useState(false);
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getAll,
  });

  if (isLoading) return <div className="p-8 text-center">Loading posts...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Error loading posts!</div>
    );

  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Button onClick={() => setIsCreating(true)}>Create Post</Button>
      </div>

      {isCreating && (
        <div className="mb-8 rounded-lg border p-4 shadow">
          <h2 className="mb-4 text-xl font-semibold">Create New Post</h2>
          <PostForm onSuccess={() => setIsCreating(false)} />
        </div>
      )}

      {posts && posts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="rounded-lg border p-4 shadow transition hover:shadow-md"
            >
              <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
              <p className="mb-4 text-gray-600">
                {post.content.substring(0, 100)}...
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Created: {new Date(post.created_at).toLocaleDateString()}
                </span>
                <Link
                  to={`/post/${post.id}`}
                  className="text-blue-500 hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-lg text-gray-500">
            No posts found. Create your first post!
          </p>
        </div>
      )}
    </div>
  );
}
