import React, { useState, useEffect } from "react";
import "../assets/css/component/sideMenu.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaUser, FaCog } from "react-icons/fa"; // Using react-icons for icons
import { FaMoneyCheck, FaUserPlus } from "react-icons/fa6";

const SideMenu = () => {
  const location = useLocation(); // Get current route using useLocation
  const [activeKey, setActiveKey] = useState(location.pathname); // Initialize state with current pathname

  // Update activeKey whenever location changes
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location]); // Dependency on location.pathname, so it updates on route change

  const [openSubMenu, setOpenSubMenu] = useState(null); // State to manage the open submenus

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu); // Toggle the submenu
  };

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

              {/* Profile menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("profile")}
                  className={`text-dark ${
                    activeKey === "/profile" ? "bg-selected" : ""
                  }`}
                >
                  <FaUser className="me-2" />
                  <span>Profile</span>
                </Nav.Link>
                {openSubMenu === "profile" && (
                  <Nav className="flex-column ps-3">
                    <Nav.Item>
                      <Nav.Link
                        href="/profile"
                        className={`text-dark ${
                          activeKey === "/profile" ? "bg-selected" : ""
                        }`}
                      >
                        Profile Details
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        href="/profile/edit"
                        className={`text-dark ${
                          activeKey === "/profile/edit" ? "bg-selected" : ""
                        }`}
                      >
                        Edit Profile
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>

              {/* Settings menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("settings")}
                  className={`text-dark ${
                    activeKey === "/settings" ? "bg-selected" : ""
                  }`}
                >
                  <FaCog className="me-2" />
                  <span>Settings</span>
                </Nav.Link>
                {openSubMenu === "settings" && (
                  <Nav className="flex-column ps-3">
                    <Nav.Item>
                      <Nav.Link
                        href="/settings/general"
                        className={`text-dark ${
                          activeKey === "/settings/general" ? "bg-selected" : ""
                        }`}
                      >
                        General Settings
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        href="/settings/security"
                        className={`text-dark ${
                          activeKey === "/settings/security"
                            ? "bg-selected"
                            : ""
                        }`}
                      >
                        Security Settings
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>

              {/* Users menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("users")}
                  className={`text-dark ${
                    activeKey === "/settings" ? "bg-selected" : ""
                  }`}
                >
                  <FaCog className="me-2" />
                  <span>Users</span>
                </Nav.Link>
                {openSubMenu === "users" && (
                  <Nav className="flex-column ps-3">
                    <Nav.Item>
                      <Nav.Link
                        href="/users/list"
                        className={`text-dark ${
                          activeKey === "/users/list" ? "bg-selected" : ""
                        }`}
                      >
                        User List
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        href="/users/create"
                        className={`text-dark ${
                          activeKey === "/users/create" ? "bg-selected" : ""
                        }`}
                      >
                        User Create
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>

              {/* Departments menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("departments")}
                  className={`text-dark ${
                    activeKey === "/departments" ? "bg-selected" : ""
                  }`}
                >
                  <FaCog className="me-2" />
                  <span>Departments</span>
                </Nav.Link>
                {openSubMenu === "departments" && (
                  <Nav className="flex-column ps-3">
                    <Nav.Item>
                      <Nav.Link
                        href="/departments/list"
                        className={`text-dark ${
                          activeKey === "/departments/list" ? "bg-selected" : ""
                        }`}
                      >
                        Departments List
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        href="/departments/create"
                        className={`text-dark ${
                          activeKey === "/departments/create"
                            ? "bg-selected"
                            : ""
                        }`}
                      >
                        Departments Create
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>

              {/* Patient menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("patients")}
                  className={`text-dark ${
                    activeKey === "/patients" ? "bg-selected" : ""
                  }`}
                >
                  <FaCog className="me-2" />
                  <span>Patients</span>
                </Nav.Link>
                {openSubMenu === "patients" && (
                  <Nav className="flex-column ps-3">
                    <Nav.Item>
                      <Nav.Link
                        href="/patients/list"
                        className={`text-dark ${
                          activeKey === "/patients/list" ? "bg-selected" : ""
                        }`}
                      >
                        Patients List
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        href="/patients/create"
                        className={`text-dark ${
                          activeKey === "/patients/create" ? "bg-selected" : ""
                        }`}
                      >
                        Patients Create
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>
            </Nav>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
