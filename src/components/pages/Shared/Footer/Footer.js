import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <p className="text-center py-3 bg-green mb-0">
        <NavLink to="/">
          <img className="logo rounded" src={logo} alt="" />
        </NavLink>
      </p>
      <p className="text-center py-3 bg-green mb-0">All rights reserved | copyright &copy; 2021</p>
    </footer>
  );
};

export default Footer;
