import { useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import unescape from "validator/lib/unescape";
import Spinner from "../spinner/spinner";
import "./post_form.css";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  image_url: z.string().min(1, { message: "Image is required" }),
  post: z.string().min(1, { message: "Post is required" }),
  public: z.boolean(),
});

type FormFields = z.infer<typeof schema>;

export default function PostForm({ onSubmit, post, rootErrors }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  if (isSubmitting) {
    return <Spinner />;
  }

  return (
    <div className="new-post__container">
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="post__form"
      >
        <label htmlFor="title">Title:</label>
        <input
          {...register("title")}
          className="new-post__input"
          type="text"
          name="title"
          id="title"
          defaultValue={post ? unescape(post.title) : ""}
        />
        {errors.title && (
          <span className="error-message">{errors.title.message}</span>
        )}
        <label htmlFor="image_url">Image URL:</label>
        <input
          {...register("image_url")}
          className="new-post__input"
          type="text"
          name="image_url"
          id="image_url"
          defaultValue={post ? unescape(post.image_url) : ""}
        />
        {errors.image_url && (
          <span className="error-message">{errors.image_url.message}</span>
        )}
        <label htmlFor="post">Post:</label>
        <Editor
          apiKey={process.env.TINYMCE_KEY}
          initialValue={post ? unescape(post.post) : ""}
          onEditorChange={(newValue) => {
            setValue("post", newValue, { shouldValidate: true });
          }}
          init={{
            body_class: "text_editor",
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | image media code",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <input
          {...register("post")}
          id="post"
          name="post"
          style={{ display: "none" }}
          defaultValue={post ? unescape(post.post) : ""}
        />
        {errors.post && (
          <span className="error-message">{errors.post.message}</span>
        )}
        <div className="public-checkbox">
          <label htmlFor="public" className="public-label">
            Publish:
          </label>
          <input
            {...register("public")}
            type="checkbox"
            className="checkbox"
            defaultChecked={post ? post.public : true}
          />
        </div>
        <button>Post</button>
        {rootErrors?.root && (
          <span className="error-message">{rootErrors?.root.message}</span>
        )}
      </form>
    </div>
  );
}
