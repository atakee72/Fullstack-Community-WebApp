import { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import transformDate from "../utils/transformDate";
import { AuthContext } from "../store/AuthContext.js";
import { Badge } from "react-bootstrap";
import AccordionItem from "./AccordionItem";
import CommentModal from "./CommentModal";
import DeletePostButton from "./DeletePostButton";

function Cards({
  post,
  comments,
  author,
  postAComment,
  deleteForumPost,
  deleteAComment,
  updateLikesCounter,
  serverMsg,
}) {
  const [activeTab, setActiveTab] = useState("Posts");
  const commentTextRef = useRef();
  const likeRef = useRef();
  const [commentText, setCommentText] = useState("");
  const { userId, loggedUser } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [commentShow, setCommentShow] = useState(false);
  const [isHeartClicked, setIsHeartClicked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <Card
      className="m-4 ms-5 me-5 p-4 card"
      style={{ backgroundColor: "#c9c4b9" }}
    >
      <DeletePostButton
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        author={author}
        deleteForumPost={deleteForumPost}
        post={post}
      />

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
            {" "}
            {activeTab === "Comments" ? (
              <Button
                variant="light"
                color="blue"
                onClick={() => setActiveTab("Comments")}
                active
              >
                Comments <Badge bg="secondary">{comments?.length}</Badge>
              </Button>
            ) : (
              <Button
                variant="light"
                color="blue"
                onClick={() => setActiveTab("Comments")}
              >
                Comments <Badge bg="secondary">{comments?.length}</Badge>
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
                disabled={!loggedUser}
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
                disabled={!loggedUser}
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
                  backgroundColor: "#4b9aaa",
                  textDecoration: "underline",
                  color: "gray",
                  fontSize: "0.8em",
                }}
              >
                <span
                  style={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "1%",
                  }}
                >
                  Date: {transformDate(post.date)} - Views: {post.views}
                  <button
                    style={{ border: "none", background: "none" }}
                    ref={likeRef}
                    onClick={(e) => {
                      updateLikesCounter(e, post);
                      setIsHeartClicked(true);
                    }}
                  >
                    {/* {isHeartClicked && !serverMsg ? "💗" : "🤍"} */}
                    {post?.likedBy?.includes(userId) ? "💗" : "🤍"}
                    {post?.likes}
                  </button>
                  {author?.userName}{" "}
                  {
                    <img
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "30px",
                        objectFit: "cover",
                        zIndex: "1",
                        background: "none",
                      }}
                      src={post.author?.userPicture}
                    />
                  }
                </span>
              </h6>
            </i>
            <Card.Title>{post?.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>

            <>
              {/* Tags: {post.tags.at(0)}, {post.tags.at(1)} */}
              <ul
                style={{
                  display: "inline-block",
                  margin: "1%",
                  listStyle: "none",
                  backgroundColor: "#4b9aaa",
                  color: "white",
                  borderRadius: "5px",
                  textDecoration: "underline",
                  fontSize: "0.8em",
                }}
                className="m-1 p-1"
              >
                {post?.tags.map((tag, i) => (
                  <li key={i}>
                    <span> Tags: {tag} </span>
                  </li>
                ))}
              </ul>
            </>
            <>
              {/* Tags: {post.tags.at(0)}, {post.tags.at(1)} */}
              <div>
                {post?.tags.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      display: "inline-block",
                      backgroundColor: "#4b9aaa",
                      color: "white",
                      borderRadius: "5px",
                      padding: "0.2em 0.5em",
                      margin: "0.2em",
                      fontSize: "0.8em",
                      textDecoration: "underline",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </>
          </div>
        </Card.Body>
      )}
      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>COMMENTS TAB */}
      {activeTab === "Comments" && comments && (
        <Card.Body>
          <AccordionItem
            comments={comments}
            // isClicked={isClicked}
            // setIsClicked={setIsClicked}
            setCommentShow={setCommentShow}
            deleteAComment={deleteAComment}
          />
        </Card.Body>
      )}
      {/* {//! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>NEW COMMENT TAB */}
      {activeTab === "newComment" && (
        <Card.Body
          style={{ display: "inline-flex", gap: "10vw", height: "100%" }}
        >
          <CommentModal
            show={show}
            handleClose={handleClose}
            setActiveTab={setActiveTab}
            commentText={commentText}
            setCommentText={setCommentText}
            commentTextRef={commentTextRef}
            postAComment={postAComment}
            post={post}
          />
        </Card.Body>
      )}
      {/* ============================================================= */}
    </Card>
  );
}

export default Cards;
