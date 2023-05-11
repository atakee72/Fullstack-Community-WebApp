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
      <Modal.Header className="m-1 p-1" closeButton>
        <Modal.Title>Add a comment</Modal.Title>
      </Modal.Header>
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
              rows={5}
              columns={12}
              ref={commentTextRef}
              onChange={(e) => setCommentText(e.target.value)}
              className="m-0 p-0"
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CommentModal;
