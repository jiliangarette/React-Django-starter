declare module "@/components/PostForm" {
  import { FC } from "react";

  interface PostFormProps {
    onSuccess: () => void;
  }

  const PostForm: FC<PostFormProps>;
  export default PostForm;
}
