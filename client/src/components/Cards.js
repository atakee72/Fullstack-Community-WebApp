import { useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import transformDate from "../utils/transformDate";

function Cards({ topic, comments }) {
  const [activeTab, setActiveTab] = useState("Topics");
  const inputRef = useRef(null);
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
        <Nav variant="tabs" defaultActiveKey="Topics">
          <Nav.Item>
            {activeTab === "Topics" ? (
              <Button
                variant="light"
                onClick={() => setActiveTab("Topics")}
                active
              >
                Topics
              </Button>
            ) : (
              <Button variant="light" onClick={() => setActiveTab("Topics")}>
                Topics
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
                Join the discussion
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={() => setActiveTab("newComment")}
              >
                Join the discussion
              </Button>
            )}
          </Nav.Item>
        </Nav>
      </Card.Header>
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TOPICS TAB */}
      {activeTab === "Topics" && topic && (
        <Card.Body>
          <Card.Title>{topic.title}</Card.Title>
          <Card.Text>{topic.body}</Card.Text>
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
                    {comment?.upvotes} - Author: {comment.author}
                  </h6>
                </i>
                <Card.Text>{comment.body}</Card.Text>
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
              <Card.Title>Write a comment!</Card.Title>
              <Card.Text>
                Be the first one to Write a comment for this topic!
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
