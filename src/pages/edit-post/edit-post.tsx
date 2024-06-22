import PostForm from "../../components/post_form/post_form";
import { SubmitHandler } from "react-hook-form";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { editPost } from "../../api/posts";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  image_url: z.string().min(1, { message: "Image is required" }),
  post: z.string().min(1, { message: "Post is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function EditPost() {
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

  return <PostForm onSubmit={onSubmit} post={post} />;
}
