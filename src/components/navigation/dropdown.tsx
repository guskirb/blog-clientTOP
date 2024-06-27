import { Link } from "react-router-dom";
import "./navigation.css";

export default function Dropdown() {
  return (
    <div className="settings-dropdown">
      <ul>
        <Link to="/new-post">
          <li className="dropdown-link">New Post</li>
        </Link>
        <Link to="/drafts">
          <li className="dropdown-link">Drafts</li>
        </Link>
      </ul>
    </div>
  );
}
