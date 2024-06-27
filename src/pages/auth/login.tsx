import { Link, useNavigate, useLocation } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthUser from "../../api/auth";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/spinner/spinner";
import "./form.css";

const schema = z.object({
  username: z.string().min(1, { message: "User is required" }),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" }),
});

type FormFields = z.infer<typeof schema>;

export default function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const { setAuth }: any = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      let response = await AuthUser.logIn(data);
      if (response.status === 400) {
        throw new Error();
      } else {
        AuthUser.setLocalStorage(response);
        setAuth(response);
        window.location.href="/"
      }
    } catch (err) {
      setError("password", {
        message: "Username or password is incorrect",
      });
    }
  };

  useEffect(() => {
    document.title = "Log In";
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
        <h2>Log In</h2>
        <div>
          <input
            {...register("username")}
            type="text"
            name="username"
            placeholder="Username or email"
            autoComplete="username"
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
          />
          {errors.password && (
            <span className="error-message">{errors.password.message}</span>
          )}
        </div>
        <button>Log In</button>
      </form>
      <p>
        Dont have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
