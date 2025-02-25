import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import PostForm from "@/components/PostForm";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const postId = parseInt(id || "0");

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => postsApi.getById(postId),
    enabled: !!postId,
  });

  const deleteMutation = useMutation({
    mutationFn: () => postsApi.delete(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate();
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading post...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Error loading post!</div>
    );
  if (!post) return <div className="p-8 text-center">Post not found</div>;

  return (
    <div className="container max-w-3xl py-8">
      <div className="mb-4 flex items-center gap-2">
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to Posts
        </Button>
      </div>

      {isEditing ? (
        <div className="rounded-lg border p-4 shadow">
          <h2 className="mb-4 text-xl font-semibold">Edit Post</h2>
          <PostForm post={post} onSuccess={() => setIsEditing(false)} />
        </div>
      ) : (
        <div className="rounded-lg border p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>

          <div className="mb-6 whitespace-pre-wrap text-lg">{post.content}</div>

          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <p>Created: {new Date(post.created_at).toLocaleString()}</p>
            <p>Updated: {new Date(post.updated_at).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
