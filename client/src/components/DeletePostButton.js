import { useContext } from "react";
import CloseButton from "react-bootstrap/CloseButton";
import { AuthContext } from "../store/AuthContext.js";
import Alert from "react-bootstrap/Alert";

function DeletePostButton({
  showAlert,
  setShowAlert,
  author,
  deleteForumPost,
  post,
}) {
  const { userId } = useContext(AuthContext);

  return (
    <>
      {/* activeTab !== "Posts" && */}
      {showAlert && userId === author?._id ? (
        <Alert variant="danger" onClose={() => setShowAlert(false)}>
          <span>Do you really want to delete your post reversibly?</span>
          <div className="d-flex gap-3">
            <b>
              <span
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  deleteForumPost(e, post);
                  setShowAlert(false);
                }}
              >
                Yes
              </span>
            </b>
            &emsp; &emsp;
            <b>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => setShowAlert(false)}
              >
                No
              </span>
            </b>
          </div>
        </Alert>
      ) : showAlert ? (
        <Alert
          id="isNotAuthor"
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          <h6>You are not allowed for this action.</h6>
        </Alert>
      ) : (
        <CloseButton id="isNotAuthor" onClick={() => setShowAlert(true)} />
      )}
    </>
  );
}

export default DeletePostButton;
