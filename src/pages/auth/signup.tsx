import { Link } from "react-router-dom";
import "./form.css";

export default function SignUp() {
  return (
    <div className="form__container">
      <form action="" method="POST">
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" placeholder="Enter a username" autoComplete="new-username"/>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" placeholder="Enter an email" autoComplete="email"/>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="Enter password" autoComplete="new-password"/>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm password"
          autoComplete="new-password"
        />
        <button>Sign Up</button>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
}
