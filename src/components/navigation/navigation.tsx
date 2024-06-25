import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import AuthUser from "../../api/auth";
import { getUser } from "../../api/users";
import "./navigation.css";

import Dropdown from "./dropdown";

export default function Navigation() {
  const { auth, setAuth }: any = useAuth();
  const [delayHandler, setDelayHandler] = useState(null);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();

  async function onLogout() {
    AuthUser.logOut();
    const response = await getUser();
    setAuth(response);
    navigate("/", { replace: true });
  }

  function showModal() {
    clearTimeout(delayHandler);
    setModal(true);
  }

  function hideModal() {
    setDelayHandler(
      setTimeout(() => {
        setModal(false);
      }, 500)
    );
  }

  console.log(modal);

  return (
    <div className="nav__container">
      <div>
        <Link to="/" className="nav__header">
          <h1>Blog</h1>
        </Link>
      </div>
      <div>
        <Link to="/all">
          <button>All Posts</button>
        </Link>
        <button>Tech</button>
      </div>
      {auth.user ? (
        <div className="auth-buttons">
          <p>Welcome <b>{auth.user?.username.toUpperCase()}</b></p>
          {auth.user?.admin && (
            <div onMouseEnter={showModal} onMouseLeave={hideModal}>
              <div className="settings-button"></div>
              {modal && <Dropdown />}
            </div>
          )}
          <button className="pill-button" onClick={onLogout}>
            LOG OUT
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/login">
            <button className="pill-button">LOG IN</button>
          </Link>
        </div>
      )}
    </div>
  );
}
