import React from "react";
import {
  ButtonGroup,
  Navbar,
  Dropdown,
  DropdownButton,
  Container,
} from "react-bootstrap";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function NavLanding() {
  return (
    <Navbar className="navbar-custom py-3" expand="lg">
      <Container className="d-flex align-items-center">
        {/* Brand Name on the Left */}
        <Link to="/" className="text-decoration-none">
          <h3 className="brand-heading">ArtisanConnect</h3>
        </Link>

        {/* Right-side nav items */}
        <div className="d-flex align-items-center gap-3 ms-auto pe-3">
          <Link to="/about" className="nav-link-text text-decoration-none">
            About
          </Link>
          <Link to="/contact" className="nav-link-text text-decoration-none">
            Contact Us
          </Link>

          {/* Become an Artisan */}
          <DropdownButton
            variant="outline-light"
            title="Become an Artisan"
            className="seller-btn"
          >
            <Dropdown.Item as={Link} to="/artisan/login">
              Login
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/artisan/register">
              Register
            </Dropdown.Item>
          </DropdownButton>

          {/* Login and Sign Up */}
          <ButtonGroup>
            <DropdownButton
              as={ButtonGroup}
              variant="outline-light"
              title="Login"
              className="login-btn"
            >
              <Dropdown.Item as={Link} to="/buyer/login">
                Buyer
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/deliveryagent/login">
                Delivery Agents
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/admin/login">
                Administrator
              </Dropdown.Item>
            </DropdownButton>

            <DropdownButton
              as={ButtonGroup}
              variant="light"
              title="Sign Up"
              className="signup-btn"
            >
              <Dropdown.Item as={Link} to="/buyer/register">
                Buyer
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/deliveryagent/register">
                Delivery Agents
              </Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavLanding;
