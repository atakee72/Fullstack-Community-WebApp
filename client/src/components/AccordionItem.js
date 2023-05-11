import { useContext, useState } from "react";
import React from "react";
import Alert from "react-bootstrap/Alert";
import CloseButton from "react-bootstrap/CloseButton";
import transformDate from "../utils/transformDate";
import { AuthContext } from "../store/AuthContext.js";

function AccordionItem({ comments, setCommentShow, deleteAComment }) {
  const { userId } = useContext(AuthContext);
  const [clickedIndex, setClickedIndex] = useState(null);

  //   const handleDeleteClick = (e, comment, index) => {
  //     e.stopPropagation();
  //     setClickedIndex(index);
  //   };

  const handleCloseAlert = () => {
    setClickedIndex(null);
    setCommentShow(false);
  };

  return (
    <div id="wrap">
      <ul id="accordion">
        {comments.map((comment, i) => (
          <li key={i}>
            <div className="ribbon">
              {clickedIndex === i && userId === comment?.author?._id ? (
                <Alert
                  variant="danger"
                  onClose={handleCloseAlert}
                  style={{ display: "absolute", zIndex: "1" }}
                >
                  <span>Delete your comment irreversibly?</span>
                  <div className="d-flex gap-3">
                    &emsp; &emsp;{" "}
                    <b>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          deleteAComment(e, comment);
                          handleCloseAlert();
                        }}
                      >
                        Yes
                      </span>
                    </b>{" "}
                    &emsp; &emsp;
                    <b>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={handleCloseAlert}
                      >
                        No
                      </span>
                    </b>
                  </div>
                </Alert>
              ) : clickedIndex === i ? (
                <Alert variant="danger" onClose={handleCloseAlert} dismissible>
                  <span>You are not allowed for this action.</span>
                </Alert>
              ) : (
                <CloseButton
                  style={{ backgroundColor: "lightGray" }}
                  id="isCommentAuthor"
                  onClick={() => {
                    setClickedIndex(i);
                    setCommentShow(false);
                  }}
                />
              )}
              &emsp;
              {transformDate(comment?.date)} &emsp; {comment.author?.userName}{" "}
              &emsp;
              {
                <img
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "30px",
                    objectFit: "cover",
                  }}
                  src={comment.author?.userPicture}
                />
              }
            </div>
            <div class="content">{comment?.body}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccordionItem;
