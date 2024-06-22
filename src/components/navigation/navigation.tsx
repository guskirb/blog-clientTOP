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
      <div>
        <Link to="/" className="nav__header">
          <h1>Blog</h1>
        </Link>
      </div>
      <div>
        <button>All</button>
        <button>Tech</button>
      </div>
      {auth.user ? (
        <div className="auth-buttons">
          <Link to="/new-post">
            <button>New Post</button>
          </Link>
          <button className="pill-button" onClick={onLogout}>Log Out</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login">
            <button className="pill-button">LOG IN</button>
          </Link>
          <Link to="/signup">
            <button className="pill-button">SIGN UP</button>
          </Link>
        </div>
      )}
    </div>
  );
}
