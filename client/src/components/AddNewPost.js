import React from "react";
import { Button } from "react-bootstrap";

function AddNewPost({ handleShow, collectionType }) {
  const collectionTypes = {
    topics: "Start a debate",
    announcements: "Make an announcement",
    recommendations: "Make a recommendation",
  };
  return (
    <Button
      style={{
        fontSize: "1.1em",
        backgroundColor: "#814256",
        border: "none",
        color: "#eccc6e",
        width: "100%",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2",
        position: "sticky",
        top: "0",
        zIndex: "1",
      }}
      className="p-3 topicBtn"
      variant="secondary"
      onClick={handleShow}
    >
      {collectionTypes[collectionType]}
    </Button>
  );
}

export default AddNewPost;
