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
              <Nav.Link as={NavLink} to="/settings">
                Settings
              </Nav.Link>
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
