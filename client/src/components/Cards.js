import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import transformDate from "../utils/transformDate";

function Cards({ post, comments }) {
  const [activeTab, setActiveTab] = useState("Posts");
  return (
    <Card
      style={{
        borderRadius: "5px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.2)",
        padding: "50px",
        margin: "20px 100px 20px 100px",
        gap: "20px",
        backgroundColor: "#f4f4f4",
        maxWidth: "90vw",
        minWidth: "50vw",
        minHeight: "40vh",
        overflow: "auto",
        resize: "vertical",
      }}
    >
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="Posts">
          <Nav.Item>
            {activeTab === "Posts" ? (
              <Button
                variant="light"
                onClick={() => setActiveTab("Posts")}
                active
              >
                Posts
              </Button>
            ) : (
              <Button variant="light" onClick={() => setActiveTab("Posts")}>
                Posts
              </Button>
            )}
          </Nav.Item>

          <Nav.Item>
            {activeTab === "Comments" ? (
              <Button
                variant="light"
                onClick={() => setActiveTab("Comments")}
                active
              >
                Comments
              </Button>
            ) : (
              <Button variant="light" onClick={() => setActiveTab("Comments")}>
                Comments
              </Button>
            )}
          </Nav.Item>

          <Nav.Item>
            {activeTab === "newComment" ? (
              <Button
                variant="light"
                onClick={() => setActiveTab("newComment")}
                active
              >
                Write a comment
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={() => setActiveTab("newComment")}
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
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
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

                  borderRadius: "5px",
                }}
              >
                <i>
                  <h6
                    style={{
                      padding: "0",
                      margin: "0",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      textDecoration: "underline",
                      color: "gray",
                      fontSize: "0.8em",
                    }}
                  >
                    Date: {transformDate(comment?.date)} - Upvotes:{" "}
                    {comment?.upvotes} - Author: {comment?.userName}
                  </h6>
                </i>
                <Card.Text>{comment?.body}</Card.Text>
              </div>
            </div>
          ))}
        </Card.Body>
      )}
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NEW COMMENT TAB */}
      {activeTab === "newComment" && (
        <Card.Body style={{ display: "inline-flex", gap: "10vw" }}>
          <div style={{ display: "inline-flex", gap: "10vw" }}>
            <div>
              <Card.Title>No comments?</Card.Title>
              <Card.Text>
                Be the first one to write a comment for this topic!
              </Card.Text>
            </div>

            <Form
              style={{
                minWidth: "40vw",
                minHeight: "40vh",
                overflow: "auto",
                resize: "both",
              }}
            >
              <textarea
                style={{
                  minWidth: "20vw",
                  minHeight: "20vh",
                }}
                type="text"
              />
              <Button variant="primary">Submit</Button>
            </Form>
          </div>
        </Card.Body>
      )}
    </Card>
  );
}

export default Cards;
