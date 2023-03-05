import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import transformDate from "../utils/transformDate";

function Cards({ post, comments, author, postAComment }) {
  const [activeTab, setActiveTab] = useState("Posts");
  const commentTextRef = useRef();
  // console.log("🚀 ~ Cards ~ commentTextRef:", commentTextRef.current.value);

  // const postInForum = async () => {
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  //   const urlencoded = new URLSearchParams();
  //   urlencoded.append("title", title);
  //   urlencoded.append("body", body);
  //   urlencoded.append("author", loggedUser.userName);
  //   urlencoded.append("date", new Date().getTime());
  //   urlencoded.append("tags", selectedTags);

  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: urlencoded,
  //     redirect: "follow",
  //   };

  //   try {
  //     const response = await fetch(
  //       "http://localhost:5000/api/topics/post",
  //       requestOptions
  //     );
  //     const newPost = await response.json();
  //     console.log("🚀 ~ postInForum ~ newPost:", newPost);
  //   } catch (error) {
  //     console.log("Error sending the new post", error);
  //   }
  // };

  const deleteForumPost = () => {
    alert("Deleted that post!");
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
      <CloseButton onClick={deleteForumPost}></CloseButton>
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
                onClick={() => setActiveTab("newComment")}
                active
              >
                Write a comment
              </Button>
            ) : (
              <Button
                variant="light"
                color="blue"
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
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NEW COMMENT TAB */}
      {activeTab === "newComment" && (
        <Card.Body style={{ display: "inline-flex", gap: "10vw" }}>
          <div style={{ display: "inline-flex", gap: "10vw" }}>
            <Form
              onSubmit={(e) =>
                postAComment(e, commentTextRef.current.value, post)
              }
              style={{
                minWidth: "40vw",
                minHeight: "40vh",
                overflow: "auto",
                resize: "both",
              }}
            >
              <input
                style={{
                  minWidth: "20vw",
                  minHeight: "20vh",
                }}
                type="text"
                ref={commentTextRef}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Card.Body>
      )}
    </Card>
  );
}

export default Cards;
