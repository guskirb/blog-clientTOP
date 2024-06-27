import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Spinner from "../spinner/spinner";
import { newComment } from "../../api/comments";
import "./comment.css";

const schema = z.object({
  comment: z.string().min(1, { message: "Comment is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function CommentBox({ postId, refetch, isLoading }) {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      let response = await newComment(data, postId);
      if (response.status === 401) {
        setError("root", {
          message: "There was an error making a comment",
        });
      }
      reset();
      refetch();
    } catch (err) {
      setError("root", {
        message: "There was an error making a comment",
      });
    }
  };

  if (isSubmitting || isLoading) {
    return (
      <div className="comment-form__container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="comment-form__container">
      <form
        action=""
        method="POST"
        className="comment-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <textarea
            {...register("comment")}
            className="comment-input"
            name="comment"
            id="comment"
            placeholder="Enter a comment"
          ></textarea>
          {errors.comment && (
            <span className="error-message comment-error">
              {errors.comment.message}
            </span>
          )}
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
