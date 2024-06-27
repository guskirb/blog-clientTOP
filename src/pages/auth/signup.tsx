import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthUser from "../../api/auth";
import Spinner from "../../components/spinner/spinner";
import "./form.css";

const schema = z
  .object({
    username: z.string().min(1, { message: "User is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must contain at least 5 characters" }),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

type FormFields = z.infer<typeof schema>;
type Data = {
  username: string;
  email: string;
  password: string;
  confirm?: string;
};

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data: Data) => {
    try {
      delete data.confirm;
      let response = await AuthUser.registerAccount(data);
      if (response.status === 400) {
        throw new Error();
      } else {
        navigate("/login", { replace: true });
      }
    } catch (err) {
      setError("root", {
        message: "There was an error registering",
      });
    }
  };

  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  if (isSubmitting) {
    return <Spinner />;
  }

  return (
    <div className="form__container">
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="auth_form"
      >
        <h2>Sign Up</h2>
        <div>
          <input
            {...register("username")}
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="new-username"
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
          {errors.email && (
            <span className="error-message">{errors.email.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("confirm")}
            type="password"
            name="confirm"
            placeholder="Confirm password"
            autoComplete="off"
          />
          {errors.confirm && (
            <span className="error-message">{errors.confirm.message}</span>
          )}
          {errors.root && (
            <span className="error-message">{errors.root.message}</span>
          )}
        </div>
        <button>Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
