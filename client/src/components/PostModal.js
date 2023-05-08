import React from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import TagSelector from "../components/TagSelector";

function PostModal({
  collectionType,
  show,
  handleClose,
  postInForum,
  postTitle,
  postTitleRef,
  postBodyRef,
  setPostTitle,
  postBody,
  setPostBody,
  handleTagsSelected,
  availableTags,
}) {
  const collectionTypes = {
    topics: "Start a debate",
    announcements: "Make an announcement",
    recommendations: "Make a recommendation",
  };

  const sentences = {
    topics: "Which topic do you think should be discussed here?",
    announcements: "What would you like to announce here?",
    recommendations: "What would you like to recommend here?",
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{
        background: "transparent",
      }}
    >
      <div
        style={{
          backgroundColor: "#814256",
          border: "none",
        }}
      >
        <div style={{ backgroundColor: "#814256" }}>
          <Modal.Header
            className="m-1 p-1"
            style={{
              backgroundColor: "#814256",
              color: "#eccc6e",
              border: "none",
              borderRadius: "4px",
            }}
            closeButton
          >
            <Modal.Title>{collectionTypes[collectionType]}</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body
          className="m-1 p-1"
          style={{
            backgroundColor: "#4b9aaa",
            color: "white",
            border: "none",
            width: "100%",
            textAlign: "center",
            position: "relative",
            right: "4px",
          }}
        >
          <Form className="m-1 p-3" onSubmit={postInForum}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title of Your Text</Form.Label>
              <Form.Control
                type="text"
                value={postTitle}
                ref={postTitleRef}
                onChange={(event) => setPostTitle(event.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>{sentences[collectionType]}</Form.Label>
              <Form.Control
                as="textarea"
                rows={7}
                columns={20}
                value={postBody}
                ref={postBodyRef}
                onChange={(event) => setPostBody(event.target.value)}
                className="m-0 p-0"
              />
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              style={{
                border: "none",
                backgroundColor: "#814256",
                color: "#eccc6e",
              }}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </div>
      <Modal.Footer
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "0",
          backgroundColor: "#814256",
          color: "white",
          border: "none",
        }}
      >
        <div className="my-3">
          <TagSelector
            handleTagsSelected={handleTagsSelected}
            availableTags={availableTags}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default PostModal;
