import { Link } from "react-router-dom";
import "./navigation.css";

export default function Navigation() {
  return (
    <div className="nav__container">
      <Link to="/" className="nav__header">
        <h1>Blog</h1>
      </Link>
      <Link to="/">Home</Link>
      <Link to="/login">Log In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
