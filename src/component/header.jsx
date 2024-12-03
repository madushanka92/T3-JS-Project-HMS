import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../assets/css/component/header.scss";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(location.pathname);
  const [userFeatures, setUserFeatures] = useState([]);

  // Update activeKey when location changes
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location]);

  // Fetch user feature access
  useEffect(() => {
    const featureAccessResponse = JSON.parse(
      localStorage.getItem("featureSettings")
    );
    setUserFeatures(featureAccessResponse || []);
  }, []);

  const hasAccess = (featureName, permission) => {
    const feature = userFeatures.find(
      (f) => f.featureId.featureName === featureName
    );
    return feature && feature[permission];
  };

  const Logout = () => {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
      setIsAuthenticated(false);
      navigate("/login");
    };
  };

  const headerMenuItems = [
    {
      title: "Appointments",
      link: "/appointments",
      featureAccess: { canCreate: "Appointments" },
    },
    {
      title: "Assignments",
      subMenu: [
        {
          name: "Doctor - New Assignment",
          link: "/assignments/doctor/create",
          featureAccess: { canCreate: "DoctorPatient" },
        },
        {
          name: "Doctor - Assignments",
          link: "/assignments/doctor/list",
          featureAccess: { canRead: "DoctorPatient" },
        },
        {
          name: "Nurse - New Assignment",
          link: "/assignments/nurse/create",
          featureAccess: { canCreate: "DoctorNurse" },
        },
        {
          name: "Nurse - Assignments",
          link: "/assignments/nurse/list",
          featureAccess: { canRead: "DoctorNurse" },
        },
        {
          name: "Tech - Dept : New Assignment",
          link: "/assignments/tech-department/create",
          featureAccess: { canCreate: "TechDept" },
        },
        {
          name: "Tech - Dept : Assignments",
          link: "/assignments/tech-department/list",
          featureAccess: { canRead: "TechDept" },
        },
        {
          name: "Tech - Patient : New Assignment",
          link: "/assignments/tech-patient/create",
          featureAccess: { canCreate: "TechPatient" },
        },
        {
          name: "Tech - Patient : Assignments",
          link: "/assignments/tech-patient/list",
          featureAccess: { canRead: "TechPatient" },
        },
      ],
    },
    {
      title: "Admissions",
      subMenu: [
        {
          name: "New Admission",
          link: "/admissions/create",
          featureAccess: { canCreate: "Admissions" },
        },
        {
          name: "Admissions",
          link: "/admissions/list",
          featureAccess: { canRead: "Admissions" },
        },
      ],
    },
  ];

  const filterMenuItems = (menu) =>
    menu
      .map((item) => {
        if (item.subMenu) {
          item.subMenu = item.subMenu.filter((subItem) =>
            hasAccess(
              subItem.featureAccess?.canRead ||
                subItem.featureAccess?.canCreate,
              subItem.featureAccess?.canRead ? "canRead" : "canCreate"
            )
          );
        } else if (item.link)
          return hasAccess(
            item.featureAccess?.canRead || item.featureAccess?.canCreate,
            item.featureAccess?.canRead ? "canRead" : "canCreate"
          )
            ? item
            : null;
        return item.subMenu?.length ? item : null;
      })
      .filter(Boolean);

  const filteredHeaderMenuItems = filterMenuItems(headerMenuItems);

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {filteredHeaderMenuItems.map((menu, index) =>
                menu.subMenu ? (
                  <NavDropdown
                    title={menu.title}
                    key={index}
                    id={`dropdown-${index}`}
                  >
                    {menu.subMenu?.map((subItem, subIndex) => (
                      <NavDropdown.Item
                        as={NavLink}
                        to={subItem.link}
                        key={subIndex}
                        className={activeKey === subItem.link ? "active" : ""}
                      >
                        {subItem.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    as={NavLink}
                    to={menu.link}
                    className={activeKey === menu.link ? "active" : ""}
                    key={index}
                  >
                    {menu.title}
                  </Nav.Link>
                )
              )}
              <Nav.Link
                as={NavLink}
                onClick={Logout}
                className={activeKey === "/" ? "active" : ""}
              >
                Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
