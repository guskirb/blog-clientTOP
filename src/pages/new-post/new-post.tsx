import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { newPost } from "../../api/posts";
import PostForm from "../../components/post_form/post_form";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  image_url: z.string().min(1, { message: "Image is required" }),
  post: z.string().min(1, { message: "Post is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function NewPost() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      let response = await newPost(data);
      if (response.status === 401) {
        setError("root", {
          message: "You must be an admin to make a new post",
        });
      } else {
        navigate(`/post/${response.post.id}`, { replace: true });
      }
    } catch (err) {
      setError("root", {
        message: "You must be an admin to make a new post",
      });
    }
  };

  return <PostForm onSubmit={onSubmit} />;
}
