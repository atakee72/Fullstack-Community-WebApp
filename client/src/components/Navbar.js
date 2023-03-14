import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import { AuthContext } from "../store/AuthContext";
import { getToken } from "../utils/getToken";

function Navbar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const { userId, loggedUser } = useContext(AuthContext);
  // console.log("🚀 ~ Navbar ~ loggedUser:", loggedUser);

  const token = getToken();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav>
      <div style={{ position: "absolute", right: "10px" }}>
        {token && (
          <h2>
            {" "}
            {loggedUser.userName} &emsp;
            <img
              className="loggedUserPic"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "30px",
                objectFit: "cover",
                background: "none",
              }}
              src={loggedUser?.picture}
            ></img>{" "}
          </h2>
        )}
        {/* //! muss ich vielleicht den Loader benutzen? */}
        &emsp; W: {windowWidth} & H: {windowHeight}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <a className="aNormal" href="/">
          <img
            style={{
              maxWidth: "15vw",
              minWidth: "150px",
              borderRadius: "50px",
            }}
            src="https://res.cloudinary.com/djgxiadrc/image/upload/v1677334203/communityWebApp/Beige_und_Grau_Minimalistisch_Zitat_Instagram-Beitrag_Kopyas%C4%B1_6_g2r1na.png"
            alt="logo"
          />
        </a>
        <ul>
          <li>
            <NavLink to="/">
              <span>Home</span>
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
          {loggedUser && (
            <li>
              <NavLink to="userProfile">
                <span>User Profile</span>
              </NavLink>{" "}
            </li>
          )}
          {/* <li>
            <NavLink to="landingPage">
              <span>(Landing Page)</span>
            </NavLink>{" "}
          </li> */}
          {userId && (
            <li>
              <Logout />
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
