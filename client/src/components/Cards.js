import { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import transformDate from "../utils/transformDate";
import { AuthContext } from "../store/AuthContext.js";
import Alert from "react-bootstrap/Alert";

function Cards({ post, comments, author, postAComment, deleteForumPost }) {
  const [activeTab, setActiveTab] = useState("Posts");
  const commentTextRef = useRef();
  const [commentText, setCommentText] = useState("");
  const { userId } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  // const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    // resetPostForm();
  };

  return (
    <Card
      style={{
        borderRadius: "5px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        gap: "20px",
        width: "100%",
        backgroundColor: "#f4f4f4",
        overflow: "auto",
        resize: "vertical",
      }}
      className="m-4 ms-5 me-5 p-4"
    >
      {activeTab !== "Posts" ? (
        <br />
      ) : (
        <div>
          {userId === author?._id ? (
            <>
              <CloseButton
                id="isAuthor"
                onClick={() => setShow(true)}
              ></CloseButton>

              {show && (
                <Alert
                  id="isAuthor"
                  variant="danger"
                  onClose={() => setShow(false)}
                  dismissible
                >
                  <h6>
                    Do you really want to delete your post? This action is not
                    reversible.
                  </h6>
                  <div className="d-flex gap-3">
                    <Button
                      className="ps-4 pe-4 m-2"
                      variant={"danger"}
                      onClick={(e) => {
                        deleteForumPost(e, post);
                        setShow(false);
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      className="ps-4 pe-4 m-2"
                      variant={"success"}
                      onClick={() => setShow(false)}
                    >
                      No
                    </Button>
                  </div>
                </Alert>
              )}
            </>
          ) : (
            <>
              <CloseButton
                id="isNotAuthor"
                onClick={() => setShow(true)}
              ></CloseButton>

              {show && (
                <Alert
                  id="isNotAuthor"
                  variant="danger"
                  onClose={() => setShow(false)}
                  dismissible
                >
                  <h6>You are not allowed for this action.</h6>
                </Alert>
              )}
            </>
          )}
        </div>
      )}
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="Posts">
          <Nav.Item>
            {activeTab === "Posts" ? (
              <Button
                variant="light"
                color="blue"
                onClick={() => setActiveTab("Posts")}
                active
              >
                Posts
              </Button>
            ) : (
              <Button
                variant="light"
                color="blue"
                onClick={() => setActiveTab("Posts")}
              >
                Posts
              </Button>
            )}
          </Nav.Item>

          <Nav.Item>
            {activeTab === "Comments" ? (
              <Button
                variant="light"
                color="blue"
                onClick={() => setActiveTab("Comments")}
                active
              >
                Comments
              </Button>
            ) : (
              <Button
                variant="light"
                color="blue"
                onClick={() => setActiveTab("Comments")}
              >
                Comments
              </Button>
            )}
          </Nav.Item>

          <Nav.Item>
            {activeTab === "newComment" ? (
              <Button
                variant="light"
                color="blue"
                onClick={() => {
                  handleShow();
                  setActiveTab("newComment");
                }}
                active
              >
                Write a comment
              </Button>
            ) : (
              <Button
                variant="light"
                color="blue"
                onClick={() => {
                  handleShow();
                  setActiveTab("newComment");
                }}
              >
                Write a comment
              </Button>
            )}
          </Nav.Item>
        </Nav>
      </Card.Header>
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TOPICS TAB */}
      {activeTab === "Posts" && post && (
        <Card.Body>
          <div
            style={{
              margin: "10px",

              borderRadius: "5px",
            }}
          >
            <i>
              <h6
                style={{
                  padding: "2%",
                  borderRadius: "5px",
                  margin: "0 0 5% 0",
                  backgroundColor: "skyBlue",
                  textDecoration: "underline",
                  color: "gray",
                  fontSize: "0.8em",
                }}
              >
                <span
                  style={{
                    color: "white",
                  }}
                >
                  Date: {transformDate(post.date)} - Views: {post.views} -
                  Author: {author?.userName}
                </span>
              </h6>
            </i>
            <Card.Title>{post?.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>

            <>
              {/* Tags: {post.tags.at(0)}, {post.tags.at(1)} */}
              {post.tags?.map((tag, i) => (
                <ul
                  style={{
                    display: "inline-block",
                    listStyle: "none",
                    backgroundColor: "skyBlue",
                    color: "white",
                    borderRadius: "5px",
                    textDecoration: "underline",
                    fontSize: "0.8em",
                  }}
                  className="m-1 p-1"
                >
                  <i>
                    <li key={i}>{tag} </li>
                  </i>
                </ul>
              ))}
            </>
          </div>
        </Card.Body>
      )}
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COMMENTS TAB */}
      {activeTab === "Comments" && comments && (
        <Card.Body>
          {comments.map((comment, i) => (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "5vw",
                // backgroundColor: "rgba(0, 0, 0, 0.1)",
                borderRadius: "5px",
              }}
              key={i}
            >
              <div
                style={{
                  margin: "10px",
                  padding: "2% 0 5% 0",
                  borderBottom: "1px solid lightGray",
                }}
              >
                <i>
                  <h6
                    style={{
                      padding: "2%",
                      borderRadius: "5px",
                      margin: "0 0 5% 0",
                      backgroundColor: "skyBlue",
                      textDecoration: "underline",
                      color: "gray",
                      fontSize: "0.8em",
                    }}
                  >
                    <span
                      style={{
                        color: "white",
                      }}
                    >
                      Date: {transformDate(comment.date)} - Author:{" "}
                      {comment.userName}
                    </span>
                  </h6>
                </i>
                <Card.Text>{comment.body}</Card.Text>
              </div>
            </div>
          ))}
        </Card.Body>
      )}
      {/* {//! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NEW COMMENT TAB */}
      {activeTab === "newComment" && (
        <Card.Body style={{ display: "inline-flex", gap: "10vw" }}>
          <Modal show={show} onHide={handleClose}>
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
                    Please write your topic here then click submit
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
        </Card.Body>
      )}

      {/* ===================================================================================== */}
    </Card>
  );
}

export default Cards;
