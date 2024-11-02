import { Outlet } from "react-router-dom";
import Header from "../component/header";
import SideMenu from "../component/sideMenu";
import Footer from "../component/footer";

import "./layout.scss";

function Layout() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="middle-container">
        <SideMenu />
        <main>
          <Outlet /> {/* This renders the current page */}
        </main>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
