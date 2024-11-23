import React, { useState, useEffect } from "react";
import "../assets/css/component/sideMenu.scss";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { FaHome, FaUser, FaCog, FaHospitalUser, FaBuilding , FaHeartbeat, FaPeopleArrows, FaHospital} from "react-icons/fa"; // Using react-icons for icons
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

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

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
                <NavLink
                  to="/home"
                  className={`text-dark nav-link ${
                    activeKey === "/home" ? "bg-selected" : ""
                  }`}
                >
                  <FaHome className="me-2" />
                  <span>Home</span>
                </NavLink>
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
                  <Nav className="flex-column ps-3 pt-0">
                    <Nav.Item>
                      <NavLink
                        to={`/profile/${userId}`} // Dynamically setting the user id
                        className={`text-dark ${
                          activeKey === `/profile/${userId}`
                            ? "bg-selected"
                            : ""
                        }`}
                      >
                        Profile Details
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>

              {/* Settings menu with subitems */}
              {/* <Nav.Item>
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
                  <Nav className="flex-column ps-3 pt-0">
                    <Nav.Item>
                      <NavLink
                        to="/settings/general"
                        className={`text-dark ${
                          activeKey === "/settings/general" ? "bg-selected" : ""
                        }`}
                      >
                        General Settings
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink
                        to="/settings/security"
                        className={`text-dark ${
                          activeKey === "/settings/security"
                            ? "bg-selected"
                            : ""
                        }`}
                      >
                        Security Settings
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item> */}

              {/* Users menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("users")}
                  className={`text-dark ${
                    activeKey === "/settings" ? "bg-selected" : ""
                  }`}
                >
                  <FaHospitalUser className="me-2" />
                  <span>Users</span>
                </Nav.Link>
                {openSubMenu === "users" && (
                  <Nav className="flex-column ps-3 pt-0">
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/users/list"
                        className={`text-dark ${
                          activeKey === "/users/list" ? "bg-selected" : ""
                        }`}
                      >
                        User List
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/users/create"
                        className={`text-dark ${
                          activeKey === "/users/create" ? "bg-selected" : ""
                        }`}
                      >
                        User Create
                      </NavLink>
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
                  <FaBuilding className="me-2" />
                  <span>Departments</span>
                </Nav.Link>
                {openSubMenu === "departments" && (
                  <Nav className="flex-column ps-3 pt-0">
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/departments/list"
                        className={`text-dark ${
                          activeKey === "/departments/list" ? "bg-selected" : ""
                        }`}
                      >
                        Departments List
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/departments/create"
                        className={`text-dark ${
                          activeKey === "/departments/create"
                            ? "bg-selected"
                            : ""
                        }`}
                      >
                        Departments Create
                      </NavLink>
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
                  <FaHeartbeat className="me-2" />
                  <span>Patients</span>
                </Nav.Link>
                {openSubMenu === "patients" && (
                  <Nav className="flex-column ps-3 pt-0">
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/patients/list"
                        className={`text-dark ${
                          activeKey === "/patients/list" ? "bg-selected" : ""
                        }`}
                      >
                        Patients List
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/patients/create"
                        className={`text-dark ${
                          activeKey === "/patients/create" ? "bg-selected" : ""
                        }`}
                      >
                        Patients Create
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>

              <Nav.Item>
                <NavLink
                  to="/roles"
                  className={`text-dark nav-link ${
                    activeKey === "/roles" ? "bg-selected" : ""
                  }`}
                >
                  <FaPeopleArrows className="me-2" />
                  <span>Roles</span>
                </NavLink>
              </Nav.Item>

              {/* Room menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("rooms")}
                  className={`text-dark ${
                    activeKey === "/rooms" ? "bg-selected" : ""
                  }`}
                >
                  <FaHospital className="me-2" />
                  <span>Rooms</span>
                </Nav.Link>
                {openSubMenu === "rooms" && (
                  <Nav className="flex-column ps-3 pt-0">
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/rooms/list"
                        className={`text-dark ${
                          activeKey === "/rooms/list" ? "bg-selected" : ""
                        }`}
                      >
                        Rooms List
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/rooms/create"
                        className={`text-dark ${
                          activeKey === "/rooms/create" ? "bg-selected" : ""
                        }`}
                      >
                        Rooms Create
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                )}
              </Nav.Item>

              {/* Features menu with subitems */}
              <Nav.Item>
                <Nav.Link
                  onClick={() => toggleSubMenu("feature")}
                  className={`text-dark ${
                    activeKey === "/feature" ? "bg-selected" : ""
                  }`}
                >
                  <FaCog className="me-2" />
                  <span>Feature</span>
                </Nav.Link>
                {openSubMenu === "feature" && (
                  <Nav className="flex-column ps-3 pt-0">
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/feature/list"
                        className={`text-dark ${
                          activeKey === "/feature/list" ? "bg-selected" : ""
                        }`}
                      >
                        Feature List
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item className="pb-2">
                      <NavLink
                        to="/featureMapping/list"
                        className={`text-dark ${
                          activeKey === "/featureMapping/list"
                            ? "bg-selected"
                            : ""
                        }`}
                      >
                        Feature Mapping
                      </NavLink>
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
