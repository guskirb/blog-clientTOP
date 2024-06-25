import { Link } from "react-router-dom";
import "./navigation.css";

export default function Dropdown() {
  return (
    <div className="settings-dropdown">
      <ul>
        <li>
          <Link to="/new-post">New Post</Link>
        </li>
        <li>
        <Link to="/drafts">Drafts</Link>
        </li>
      </ul>
    </div>
  );
}
