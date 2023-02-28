import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Logout() {
  const [loggedUser, setLoggedUser] = useState({});
  const [show, setShow] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setLoggedUser(false);
    console.log("You're logged out!");
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        type="submit"
        value="Submit"
        variant="danger"
        // onClick={handleShow}
        onClick={logout}
      >
        Logout!
      </Button>{" "}
      <Modal show={show} onHide={handleClose} size="lg" centered animation>
        <Modal.Header closeButton>
          <Modal.Title>User Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>You have logged out successfully!</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="success" onClick={handleClose}>
            Close
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Logout;
