import { SubmitHandler, useForm } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPost } from "../../api/posts";
import "./new-post.css";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  image_url: z.string().min(1, { message: "Image is required" }),
  post: z.string().min(1, { message: "Post is required" }),
});

type FormFields = z.infer<typeof schema>;

export default function NewPost() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      let response = await newPost(data);
      if (response.status === 401) {
        setError("root", {
          message: "You must be an admin to make a new post",
        });
      }
    } catch (err) {
      setError("root", {
        message: "You must be an admin to make a new post",
      });
    }
  };

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
        />
        {errors.image_url && (
          <span className="error-message">{errors.image_url.message}</span>
        )}
        <label htmlFor="post">Post:</label>
        <Editor
          apiKey={process.env.TINYMCE_KEY}
          onEditorChange={(newValue, editor) => {
            setValue("post", newValue, { shouldValidate: true });
          }}
          //   onInit={(evt, editor) => {
          //     setText(editor.getContent({ format: "text" }));
          //   }}
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
        />
        {errors.post && (
          <span className="error-message">{errors.post.message}</span>
        )}
        <button>Post</button>
        {errors.root && (
          <span className="error-message">{errors.root.message}</span>
        )}
      </form>
    </div>
  );
}
