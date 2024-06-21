import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthUser from "../../api/auth";
import useAuth from "../../hooks/useAuth";
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
  const { setAuth }: any = useAuth();
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
        AuthUser.setLocalStorage(response);
        setAuth(response);
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError("root", {
        message: "There was an error registering",
      });
    }
  };

  if (isSubmitting) {
    return <Spinner />;
  }

  return (
    <div className="form__container">
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)} className="auth_form">
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          {...register("username")}
          type="text"
          name="username"
          placeholder="Enter a username"
          autoComplete="new-username"
        />
        {errors.username && (
          <span className="error-message">{errors.username.message}</span>
        )}
        <label htmlFor="email">Email:</label>
        <input
          {...register("email")}
          type="email"
          name="email"
          placeholder="Enter an email"
          autoComplete="email"
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
        <label htmlFor="password">Password:</label>
        <input
          {...register("password")}
          type="password"
          name="password"
          placeholder="Enter password"
          autoComplete="new-password"
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
        <label htmlFor="confirm">Confirm Password:</label>
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
        <button>Sign Up</button>
        {errors.root && (
          <span className="error-message">{errors.root.message}</span>
        )}
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
