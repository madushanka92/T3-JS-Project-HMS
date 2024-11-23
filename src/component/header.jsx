import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../assets/css/component/header.scss";

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Admissions" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/admissions/create">
                  New Admission
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/admissions/list">
                  Admissions
                </NavDropdown.Item>
              </NavDropdown>

              {/* Updated Assignments Dropdown with sub-menu items for Doctor, Nurse, and Tech */}
              <NavDropdown title="Assignments" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to="/assignments/doctor/create">
                  Doctor - New Assignment
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/assignments/doctor/list">
                  Doctor - Assignments
                </NavDropdown.Item>
                <NavDropdown.Divider /> {/* Divider between role sections */}
                <NavDropdown.Item as={NavLink} to="/assignments/nurse/create">
                  Nurse - New Assignment
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/assignments/nurse/list">
                  Nurse - Assignments
                </NavDropdown.Item>
                <NavDropdown.Divider /> {/* Divider between role sections */}
                <NavDropdown.Item
                  as={NavLink}
                  to="/assignments/tech-department/create"
                >
                  Tech - Dept : New Assignment
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/assignments/tech-department/list"
                >
                  Tech - Dept : Assignments
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/assignments/tech-patient/create"
                >
                  Tech - Patient : New Assignment
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={NavLink}
                  to="/assignments/tech-patient/list"
                >
                  Tech - Patient : Assignments
                </NavDropdown.Item>
              </NavDropdown>

              {/* <Nav.Link as={NavLink} to="/settings">
                Settings
              </Nav.Link> */}
              <Nav.Link as={NavLink} to="/">
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
