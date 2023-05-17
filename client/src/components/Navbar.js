import React, { useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { AuthContext } from "../store/AuthContext";
import { getToken } from "../utils/getToken";

function Navbar() {
  const { userId, loggedUser } = useContext(AuthContext);
  const token = getToken();

  // const nav = document.querySelector("#navigation");

  return (
    <div className="navContainer">
      <nav>
        <ul>
          <div>
            <li className="ornek">
              <NavLink to="/">
                <span>Home</span>
              </NavLink>
            </li>
            <li className="loginLink">
              <NavLink to="login">
                <span>Login</span>
              </NavLink>
            </li>
            <li className="registerLink">
              <NavLink to="register">
                <span>Register</span>
              </NavLink>
            </li>
            {loggedUser && (
              <li className="profileLink">
                <NavLink to="userProfile">
                  <span>User Profile</span>
                </NavLink>
              </li>
            )}
          </div>
          {userId && (
            <li className="logoutLink">
              <Logout />
            </li>
          )}
        </ul>
      </nav>

      {/* <button
        className="hamburger hamburger--spring"
        type="button"
        aria-label="Menu"
        aria-controls="navigation"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button> */}

      <div
        style={{
          position: "fixed",
          top: "45%",
          right: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {token && (
          <>
            <NavLink to="userProfile">
              <img
                className="loggedUserPic"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "30px",
                  objectFit: "cover",
                  background: "none",
                  boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
                  cursor: "pointer",
                }}
                src={loggedUser?.picture}
                alt={`${loggedUser?.userName}'s profile picture`}
              />
            </NavLink>

            <h2 style={{ color: "#4b9aaa", fontSize: "1rem" }}>
              {" "}
              {loggedUser?.userName}{" "}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
