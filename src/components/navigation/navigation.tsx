import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./navigation.css";

export default function Navigation() {
  const { auth }: any = useAuth();

  return (
    <div className="nav__container">
      <Link to="/" className="nav__header">
        <h1>Blog</h1>
      </Link>
      <Link to="/">Home</Link>
      {auth.user ? (
        <>
          <h3>Welcome {auth.user.username}</h3>
          <Link to="/logout">Log Out</Link>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}
