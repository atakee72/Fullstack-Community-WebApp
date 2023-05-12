import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CommentModal({
  show,
  handleClose,
  setActiveTab,
  commentText,
  setCommentText,
  commentTextRef,
  postAComment,
  post,
}) {
  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
        setActiveTab("Comments");
      }}
    >
      <div
        style={{
          backgroundColor: "#814256",
          border: "none",
          borderRadius: "5px 5px 0 0 ",
        }}
      >
        <Modal.Header
          className="m-1 p-1"
          style={{
            backgroundColor: "#814256",
            color: "#eccc6e",
            border: "none",
          }}
          closeButton
        >
          <Modal.Title>Add a comment</Modal.Title>
        </Modal.Header>
      </div>

      <div
        style={{
          backgroundColor: "#4b9aaa",
          border: "none",
          textAlign: "center",
          borderRadius: "0 0 5px 5px ",
        }}
      >
        <Modal.Body className="m-1 p-1">
          <Form
            className="m-1 p-3"
            onSubmit={(e) => {
              handleClose();
              if (commentText) {
                postAComment(e, commentText, post);
              }

              setActiveTab("Comments");
            }}
          >
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>
                Please write your comment below then click submit
              </Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                rows={7}
                columns={15}
                ref={commentTextRef}
                onChange={(e) => setCommentText(e.target.value)}
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
    </Modal>
  );
}

export default CommentModal;
