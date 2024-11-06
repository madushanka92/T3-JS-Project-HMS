import { Outlet } from "react-router-dom";
import Header from "../component/header";
import SideMenu from "../component/sideMenu";
import Footer from "../component/footer";

import "./layout.scss";

function Layout() {
  return (
    <div className="app-container">
      <div className="main-container">
        <div className="side-container">
          <SideMenu />
        </div>
        <div className="middle-container">
          <div className="header-container">
            <Header />
          </div>
          <main>
            <Outlet /> {/* This renders the current page */}
          </main>
        </div>
      </div>
      <div className="footer-container">
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Layout;
