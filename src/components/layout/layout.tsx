import Navigation from "../navigation/navigation";
import { Outlet } from "react-router-dom";
import "./layout.css"

export default function Layout() {
  return (
    <div className="layout__container">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
