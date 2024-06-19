import { Link } from "react-router-dom";
import "./form.css"

export default function LogIn() {
  return (
    <div className="form__container">
      <form action="" method="POST">
        <h2>Log In</h2>
        <label htmlFor="username">User:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username or email"
          autoComplete="username"
        />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" placeholder="Enter password" autoComplete="current-password"/>
        <button>Log In</button>
        <p>
          Dont have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}
