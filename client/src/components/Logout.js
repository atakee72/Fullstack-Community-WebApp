import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../store/AuthContext";

function Logout() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <button
        type="submit"
        value="Submit"
        variant="danger"
        onClick={logout}
        style={{
          color: "#eccc6e",
          textDecoration: "none",
          marginRight: "20px",
          backgroundColor: "#814256",
          padding: "7px",
          borderRadius: "4px",
          border: "1px solid #eccc6e",
        }}
      >
        Logout!
      </button>{" "}
    </>
  );
}

export default Logout;
