import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post, PostInput, postsApi } from "@/lib/api";
import { postSchema, PostFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PostFormProps {
  post?: Post;
  onSuccess?: () => void;
}

export default function PostForm({ post, onSuccess }: PostFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!post;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: PostInput) => postsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      reset();
      if (onSuccess) onSuccess();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: PostInput) => postsApi.update(post!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", post!.id] });
      if (onSuccess) onSuccess();
    },
  });

  const onSubmit = (data: PostFormData) => {
    if (isEditing) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Input
          id="title"
          placeholder="Enter post title"
          {...register("title")}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <Textarea
          id="content"
          placeholder="Enter post content"
          rows={5}
          {...register("content")}
          className={errors.content ? "border-red-500" : ""}
        />
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isEditing ? "Update Post" : "Create Post"}
        </Button>
        {onSuccess && (
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
