import Navigation from "../navigation/navigation";
import Footer from "../footer/footer";
import { Outlet } from "react-router-dom";
import "./layout.css";

export default function Layout() {
  return (
    <>
      <div className="nav">
        <Navigation />
      </div>
      <main>
        <Outlet />
      </main>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
