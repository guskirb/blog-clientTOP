import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer__container">
      <div className="footer__main">
        <Link to="/" className="footer__header">
          <h1>Blog</h1>
        </Link>
        <div>
          <ul>
            <li>Pages</li>
            <Link to="/">
            <li>Home</li>
            </Link>
          </ul>
        </div>
        <div>
          <ul>
            <li>Categories</li>
            <Link to="/all/page/1" className="footer__header">
              <li>All</li>
            </Link>
            <Link to="/travel/page/1" className="footer__header">
              <li>Travel</li>
            </Link>
            <Link to="/sport/page/1" className="footer__header">
              <li>Sport</li>
            </Link>
            <Link to="/tech/page/1" className="footer__header">
              <li>Tech</li>
            </Link>
            <Link to="/books/page/1" className="footer__header">
              <li>Books</li>
            </Link>
          </ul>
        </div>
        <div>
          <ul>
            <li>Contact</li>
            <a href="https://github.com/guskirb">
              <li>Github</li>
            </a>
          </ul>
        </div>
      </div>
      <div className="footer__border">
        <p>
          Made by{" "}
          <a className="footer-link" href="https://github.com/guskirb">
            GUSKIRB
          </a>
        </p>
      </div>
    </div>
  );
}
