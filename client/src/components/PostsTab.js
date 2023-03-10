import React from "react";
import Card from "react-bootstrap/Card";
import transformDate from "../utils/transformDate";

function PostsTab() {
  return (
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
              color: "white",
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
              Date: {transformDate(post.date)} - Views: {post.views} - Author:{" "}
              {author?.userName}
            </span>
          </h6>
        </i>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <i>
          <span
            style={{
              padding: "1%",
              borderRadius: "5px",
              margin: "3% 0 1% 0",
              backgroundColor: "skyBlue",
              color: "white",
              textDecoration: "underline",
              color: "gray",
              fontSize: "0.8em",
            }}
          >
            <mark
              style={{
                backgroundColor: "skyBlue",
                color: "white",
              }}
            >
              {/* //todo TODO: this is a quick fix, needs modifying if more than two tags are given: */}
              Tags: {post.tags.at(0)}, {post.tags.at(1)}
            </mark>
          </span>
        </i>
      </div>
    </Card.Body>
  );
}

export default PostsTab;
