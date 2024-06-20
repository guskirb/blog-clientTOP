import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import "./form.css";

type FormFields = {
  username: string;
  password: string;
};

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };

  return (
    <div className="form__container">
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <h2>Log In</h2>
        <label htmlFor="username">User:</label>
        <input
          {...register("username", {
            required: "Username or email is required",
          })}
          type="text"
          name="username"
          placeholder="Enter username or email"
          autoComplete="username"
        />
        {errors.username && (
          <span className="error-message">{errors.username.message}</span>
        )}
        <label htmlFor="password">Password:</label>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Password must contain at least 5 characters",
            },
          })}
          type="password"
          name="password"
          placeholder="Enter password"
          autoComplete="current-password"
        />
        {errors.password && (
          <span className="error-message">{errors.password.message}</span>
        )}
        <button>Log In</button>
        <p>
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
