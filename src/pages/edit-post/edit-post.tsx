import PostForm from "../../components/post-form/post-form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editPost } from "../../api/posts";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  image_url: z.string().min(1, { message: "Image is required" }),
  category: z.string().min(1, { message: "Category is required" }),
  post: z.string().min(1, { message: "Post is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function EditPost() {
  const {
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });
  const location = useLocation();
  const { post } = location.state;
  const { postId } = useParams();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      let response = await editPost(data, postId as string);
      if (response.status === 401) {
        setError("root", {
          message: "You must be an admin to edit this post",
        });
      } else {
        navigate(`/post/${response.post.id}`, { replace: true });
      }
    } catch (err) {
      setError("root", {
        message: "You must be an admin to edit this post",
      });
    }
  };

  useEffect(() => {
    document.title = "Edit Post";
  }, []);

  return <PostForm onSubmit={onSubmit} post={post} rootErrors={errors} />;
}
