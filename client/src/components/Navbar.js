import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h1 className="logo">
        <span className="aNormal">
          <a className="aNormal" href="/">
            <h1>Local Community Web App</h1>
          </a>
        </span>
      </h1>
      <ul>
        <li>
          <NavLink to="/">
            <span>About</span>
          </NavLink>{" "}
        </li>
        <li>
          <NavLink to="login">
            <span>Login</span>
          </NavLink>{" "}
        </li>
        <li>
          <NavLink to="register">
            <span>Register</span>
          </NavLink>{" "}
        </li>
        <li>
          <NavLink to="userProfile">
            <span>User Profile</span>
          </NavLink>{" "}
        </li>
        <li>
          <NavLink to="landingPage">
            <span>(Landing Page)</span>
          </NavLink>{" "}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
