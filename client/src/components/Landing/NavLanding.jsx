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
            <DropdownButton variant="outline-light" title="Become a Seller" className="seller-btn">
              <Dropdown.Item href="#/seller-login">Login</Dropdown.Item>
              <Dropdown.Item href="#/seller-register">Register</Dropdown.Item>
            </DropdownButton>

            <ButtonGroup>
              {/* Login Dropdown */}
              <DropdownButton as={ButtonGroup} variant="outline-light" title="Login" className="login-btn">
              <Dropdown.Item href="#/signup/customer"><Link to="/user/login">User</Link></Dropdown.Item>
                <Dropdown.Item href="#/login/delivery-partner">Delivery Partner</Dropdown.Item>
                <Dropdown.Item href="#/login/admin">Administrator</Dropdown.Item>
              </DropdownButton>

              {/* Sign Up Dropdown */}
              <DropdownButton as={ButtonGroup} variant="light" title="Sign Up" className="signup-btn">
              <Dropdown.Item href=""><Link to="/user/register">User</Link></Dropdown.Item>
                <Dropdown.Item href="#/signup/delivery-partner">Delivery Partner</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>

          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavLanding;

