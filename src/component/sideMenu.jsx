import React, { useState, useEffect } from "react";
import "../assets/css/component/sideMenu.scss";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import {
  FaHome,
  FaUser,
  FaCog,
  FaHospitalUser,
  FaBuilding,
  FaHeartbeat,
  FaPeopleArrows,
  FaHospital,
} from "react-icons/fa"; // Using react-icons for icons
import { FaCircleDollarToSlot } from "react-icons/fa6";


const SideMenu = () => {
  const location = useLocation(); // Get current route using useLocation
  const [activeKey, setActiveKey] = useState(location.pathname); // Initialize state with current pathname

  // Update activeKey whenever location changes
  useEffect(() => {
    setActiveKey(location.pathname);
  }, [location]); // Dependency on location.pathname, so it updates on route change
  const [openSubMenu, setOpenSubMenu] = useState(null); // State to manage the open submenus
  const [userFeatures, setUserFeatures] = useState([]); // Store user's feature access

  const navigate = useNavigate();

  const toggleSubMenu = (item) => {
    if (item.subMenu) {
      const menu = item.name;
      setOpenSubMenu(openSubMenu === menu ? null : menu);
    } else {
      if (item.link) navigate(item.link);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user._id : null;

  // Simulate fetching user feature access (response should be from API)
  useEffect(() => {
    const featureAccessResponse = JSON.parse(
      localStorage.getItem("featureSettings")
    );
    setUserFeatures(featureAccessResponse); // Set the features access response here
  }, []);

  const hasAccess = (featureName, permission) => {
    // Check if user has the necessary permission for a feature
    const feature = userFeatures.find(
      (f) => f.featureId.featureName === featureName
    );
    return feature && feature[permission];
  };

  const filterMenuItems = (menu) => {
    return menu.filter((item) => {
      if (!item.featureAccess) {
        return true;
      }

      const featureAccess = item.featureAccess || {};
      const hasReadAccess =
        featureAccess?.canRead &&
        hasAccess(item?.featureAccess?.canRead, "canRead");
      const hasCreateAccess =
        featureAccess?.canCreate &&
        hasAccess(item?.featureAccess?.canCreate, "canCreate");

      if (!hasReadAccess && !hasCreateAccess) {
        return false; // Hide this item if the user doesn't have necessary access
      }

      // Filter sub-menu items
      if (item.subMenu) {
        item.subMenu = item.subMenu.filter((subItem) => {
          const subFeatureAccess = subItem.featureAccess || {};
          const subHasReadAccess =
            subFeatureAccess.canRead &&
            hasAccess(subItem.featureAccess.canRead, "canRead");
          const subHasCreateAccess =
            subFeatureAccess.canCreate &&
            hasAccess(subItem.featureAccess.canCreate, "canCreate");
          return subHasReadAccess || subHasCreateAccess;
        });
      }

      return true; // Show this item
    });
  };

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      link: "/home",
    },
    {
      name: "Profile",
      icon: <FaUser />,
      link: `/profile/`,
      featureAccess: {
        canRead: "UserProfile",
      },
      subMenu: [
        {
          name: "Profile Details",
          link: `/profile/${userId}`,
          featureAccess: {
            canRead: "UserProfile",
          },
        },
      ],
    },
    {
      name: "Users",
      icon: <FaHospitalUser />,
      link: "/settings",
      featureAccess: {
        canRead: "Users",
      },
      subMenu: [
        {
          name: "User List",
          link: "/users/list",
          featureAccess: {
            canRead: "Users",
          },
        },
        {
          name: "User Create",
          link: "/users/create",
          featureAccess: {
            canCreate: "Users",
          },
        },
      ],
    },
    {
      name: "Departments",
      icon: <FaBuilding />,
      link: "/departments",
      featureAccess: {
        canRead: "Departments",
      },
      subMenu: [
        {
          name: "Departments List",
          link: "/departments/list",
          featureAccess: {
            canRead: "Departments",
          },
        },
        {
          name: "Departments Create",
          link: "/departments/create",
          featureAccess: {
            canCreate: "Departments",
          },
        },
      ],
    },
    {
      name: "Patients",
      icon: <FaHeartbeat />,
      link: "/patients",
      featureAccess: {
        canRead: "Patients",
      },
      subMenu: [
        {
          name: "Patients List",
          link: "/patients/list",
          featureAccess: {
            canRead: "Patients",
          },
        },
        {
          name: "Patients Create",
          link: "/patients/create",
          featureAccess: {
            canCreate: "Patients",
          },
        },
      ],
    },
    {
      name: "Roles",
      icon: <FaPeopleArrows />,
      link: "/roles",
      featureAccess: {
        canRead: "Roles",
      },
      subMenu: [
        {
          name: "Roles",
          link: "/roles",
          featureAccess: {
            canRead: "Roles",
          },
        },
      ],
    },
    {
      name: "Rooms",
      icon: <FaHospital />,
      link: "/rooms",
      featureAccess: {
        canRead: "Rooms",
      },
      subMenu: [
        {
          name: "Rooms List",
          link: "/rooms/list",
          featureAccess: {
            canRead: "Rooms",
          },
        },
        {
          name: "Rooms Create",
          link: "/rooms/create",
          featureAccess: {
            canCreate: "Rooms",
          },
        },
      ],
    },
    {
      name: "Feature",
      icon: <FaCog />,
      link: "/feature",
      featureAccess: {
        canRead: "Features",
      },
      subMenu: [
        {
          name: "Feature List",
          link: "/feature/list",
          featureAccess: {
            canRead: "Features",
          },
        },
        {
          name: "Feature Mapping",
          link: "/featureMapping/list",
          featureAccess: {
            canRead: "Features",
          },
        },
      ],
    },
    {
      name: "Billing",
      icon: <FaCircleDollarToSlot />,
      link: "/billing",
      featureAccess: {
        canRead: "Billing",
      },
      subMenu: [
        {
          name: "Billing List",
          link: "/billing/list",
          featureAccess: {
            canRead: "Billing",
          },
        },
        // {
        //   name: "Feature Mapping",
        //   link: "/featureMapping/list",
        //   featureAccess: {
        //     canRead: "Features",
        //   },
        // },
      ],
    },
  ];

  const filteredMenuItems = filterMenuItems(menuItems);

  return (
    <div className="side-menu">
      <div className="d-flex">
        <div className="text-dark" style={{ width: "250px", height: "100vh" }}>
          <Navbar expand="lg" variant="dark" className="flex-column">
            <div className="navTitle">
              <Navbar.Brand href="/home">HMS</Navbar.Brand>
            </div>
            <Nav className="flex-column" activeKey={activeKey}>
              {filteredMenuItems.map((item, index) => (
                <Nav.Item key={index}>
                  <Nav.Link
                    onClick={() => toggleSubMenu(item)}
                    className={`text-dark ${
                      activeKey === item.link ? "bg-selected" : ""
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Nav.Link>
                  {item.subMenu &&
                    openSubMenu === item.name &&
                    item.subMenu.map((subItem, subIndex) => (
                      <Nav className="flex-column ps-3 pt-0" key={subIndex}>
                        <Nav.Item>
                          <NavLink
                            to={subItem.link}
                            className={`text-dark ${
                              activeKey === subItem.link ? "bg-selected" : ""
                            }`}
                          >
                            {subItem.name}
                          </NavLink>
                        </Nav.Item>
                      </Nav>
                    ))}
                </Nav.Item>
              ))}
            </Nav>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
