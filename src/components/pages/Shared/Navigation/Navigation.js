import React from "react";
import { Container, Nav, Button, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import logo from "../../../../assets/logo.png";
import useAuth from "../../../../hooks/useAuth";

const Navigation = () => {
  const { user, logOut } = useAuth();
  return (
    <>
      <Container>
        <Navbar expand="lg">
          <NavLink to="/">
            <img className="logo" src={logo} alt="" />
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/explore" className="nav-link">
                Explore
              </NavLink>
            </Nav>
            {!user ? (
              <>
                <NavLink to="/login">
                  <Button variant="outline-secondary-white" className="fw-bold">
                    Login
                  </Button>
                </NavLink>
                <NavLink to="/signup">
                  <Button variant="success" className="fw-bold btn-green ms-2">
                    Register
                  </Button>
                </NavLink>
              </>
            ) : (
              <>
                {/* AVATAR  */}
                <div className=" user-icon ms-3">
                  <img
                    title={user.email}
                    src={
                      user.photoURL ? user.photoURL : "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"
                    }
                    alt="user avatar"
                  />
                  <div className="user-info">
                    <div className="user-name d-flex">
                      <img
                        className="rounded"
                        src={
                          user.photoURL
                            ? user.photoURL
                            : "https://i.ibb.co/4NM5vPL/Profile-avatar-placeholder-large.png"
                        }
                        alt="user avatar"
                      />
                      <div className="text-start ps-3 mt-0">
                        <h4 className="pt-0 mb-1">{user.displayName ? user.displayName : "Anonymous"}</h4>
                        <h6 className="mb-2">{user.email}</h6>
                      </div>
                    </div>
                    <hr />
                    <ul className="text-start">
                      <li className="border-bottom d-block py-1">
                        <NavLink
                          className="d-inline-block text-decoration-none   me-3"
                          to="/dashboard"
                          activeStyle={{ color: "#ff3344" }}
                        >
                          <i className="bi bi-grid-fill me-2 text-green"></i>
                          Dashboard
                        </NavLink>
                      </li>
                    </ul>
                    <hr />
                    <Button onClick={logOut} variant="success" className=" btn-green p-2 px-3">
                      Log Out&nbsp;
                      <i className="bi bi-box-arrow-right"></i>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
};

export default Navigation;
