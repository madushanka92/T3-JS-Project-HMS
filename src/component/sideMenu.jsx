import React, { useState, useEffect } from "react";
import "../assets/css/component/sideMenu.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaUser, FaCog } from "react-icons/fa"; // Using react-icons for icons
import { FaUserPlus } from "react-icons/fa6";

const SideMenu = () => {
  const location = useLocation(); // Get current route using useLocation
  const [activeKey, setActiveKey] = useState(location.pathname); // Initialize state with current pathname

  // Update activeKey whenever location changes
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location]); // Dependency on location.pathname, so it updates on route change

  return (
    <div className="side-menu">
      <div className="d-flex">
        <div className="text-dark" style={{ width: "250px", height: "100vh" }}>
          <Navbar expand="lg" variant="dark" className="flex-column">
            <div className="navTitle">
              <Navbar.Brand href="#">HMS</Navbar.Brand>
            </div>
            <Nav className="flex-column" activeKey={activeKey}>
              <Nav.Item>
                <Nav.Link
                  href="/home"
                  className={`text-dark ${
                    activeKey === "/home" ? "bg-selected" : ""
                  }`}
                >
                  <FaHome className="me-2" />
                  <span>Home</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  href="/profile"
                  className={`text-dark ${
                    activeKey === "/profile" ? "bg-selected" : ""
                  }`}
                >
                  <FaUser className="me-2" />
                  <span>Profile</span>
                </Nav.Link>
              </Nav.Item>
                  
              <Nav.Item>
                <Nav.Link 
                  href="/Userpage"
                  className={`text-dark ${ 
                    activeKey === "/UserPage"?"bg-selected": ""
                  }`}
                  >
                    <FaUserPlus className="me-2"/>
                    <span>Add User</span>
                  </Nav.Link>             
              </Nav.Item>

              

              <Nav.Item>
                <Nav.Link
                  href="/settings"
                  className={`text-dark ${
                    activeKey === "/settings" ? "bg-selected" : ""
                  }`}
                >
                  <FaCog className="me-2" />
                  <span>Settings</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
