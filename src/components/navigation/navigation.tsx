import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./navigation.css";

import Dropdown from "./dropdown";

export default function Navigation() {
  const { auth }: any = useAuth();
  const [delayHandler, setDelayHandler] = useState(null);
  const [modal, setModal] = useState(false);

  function showModal() {
    clearTimeout(delayHandler as any);
    setModal(true);
  }

  function hideModal() {
    setDelayHandler(
      window.setTimeout(() => {
        setModal(false);
      }, 500) as any
    );
  }

  return (
    <div className="nav__container">
      <div>
        <Link to="/" className="nav__header">
          <h1>Blog</h1>
        </Link>
      </div>
      <div>
        <ul className="nav__buttons">
          <li>
            <NavLink
              to="/all/page/1"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" + "nav__link"
              }
            >
              All Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/travel/page/1"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" + "nav__link"
              }
            >
              Travel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sport/page/1"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" + "nav__link"
              }
            >
              Sport
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tech/page/1"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" + "nav__link"
              }
            >
              Tech
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/books/page/1"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : "" + "nav__link"
              }
            >
              Books
            </NavLink>
          </li>
        </ul>
      </div>
      {auth.user ? (
        <div className="auth-buttons">
          <p>
            Welcome <b>{auth.user?.username.toUpperCase()}</b>
          </p>
          {auth.user?.admin && (
            <div onMouseEnter={showModal} onMouseLeave={hideModal}>
              <div className="settings-button"></div>
              {modal && <Dropdown />}
            </div>
          )}
          <Link to="logout">
            <button className="pill-button">LOG OUT</button>
          </Link>
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
