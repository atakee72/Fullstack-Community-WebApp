import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../store/AuthContext";

function Logout() {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <Button type="submit" value="Submit" variant="danger" onClick={logout}>
        Logout!
      </Button>{" "}
    </>
  );
}

export default Logout;
