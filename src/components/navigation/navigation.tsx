import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AuthUser from "../../api/auth";
import "./navigation.css";

export default function Navigation() {
  const { auth, setAuth }: any = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    AuthUser.logOut();
    setAuth("");
    navigate("/", { replace: true });
  }

  return (
    <div className="nav__container">
      <Link to="/" className="nav__header">
        <h1>Blog</h1>
      </Link>
      <Link to="/">
        <button>Home</button>
      </Link>
      {auth.user ? (
        <>
          <Link to="/new-post">
            <button>New Post</button>
          </Link>
          <button onClick={onLogout}>Log Out</button>
        </>
      ) : (
        <>
          <Link to="/login">
            <button>Log In</button>
          </Link>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </>
      )}
    </div>
  );
}
