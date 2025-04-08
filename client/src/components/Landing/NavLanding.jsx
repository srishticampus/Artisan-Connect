import React from 'react';
import { Button, ButtonGroup, Navbar, Dropdown, DropdownButton } from "react-bootstrap";
import './LandingPage.css';
import { Link } from 'react-router-dom';

function NavLanding() {
  return (
    <div>
      <Navbar className="navbar-custom" expand="lg">
        <Navbar.Brand href="#" className="brand">ArtisansConnect</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <div className="nav-buttons d-flex gap-2 align-items-center">
            
            {/* Become a Seller Dropdown */}
            <DropdownButton variant="outline-light" title="Become a Artisans" className="seller-btn">
              <Dropdown.Item href="">Login</Dropdown.Item>
              <Dropdown.Item href="">Register</Dropdown.Item>
            </DropdownButton>
            <ButtonGroup>
              {/* Login Dropdown */}
              <DropdownButton as={ButtonGroup} variant="outline-light" title="Login" className="login-btn">
              <Dropdown.Item href=""><Link to="/user/login">Buyer</Link></Dropdown.Item>
                <Dropdown.Item href="">Delivery Agents</Dropdown.Item>
                <Dropdown.Item href="">Administrator</Dropdown.Item>
              </DropdownButton>

              {/* Sign Up Dropdown */}
              <DropdownButton as={ButtonGroup} variant="light" title="Sign Up" className="signup-btn">
              <Dropdown.Item href=""><Link to="/user/register">Buyer</Link></Dropdown.Item>
                <Dropdown.Item href="">Delivery Agents</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>

          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavLanding;

