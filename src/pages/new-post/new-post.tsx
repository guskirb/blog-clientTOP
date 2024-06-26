import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPost } from "../../api/posts";
import PostForm from "../../components/post-form/post-form";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  image_url: z.string().min(1, { message: "Image is required" }),
  post: z.string().min(1, { message: "Post is required" }),
  public: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export default function NewPost() {
  const {
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
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

  useEffect(() => {
    document.title = "New Post";
  }, []);

  return <PostForm onSubmit={onSubmit} post={null} rootErrors={errors} />;
}
