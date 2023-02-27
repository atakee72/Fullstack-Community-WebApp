import { urlencoded } from "express";
import React, { useState } from "react";

function PostComment() {
  const [comment, setComment] = useState("");

  const { loggedInUser } = useContext(AuthContex);
  const submitComment = () => {
    const message = new urlencoded();
    message.append("authorName", loggedInUser.userName);
    message.append("text", comment);
    fetch("someServerURL");
  };
  return (
    <div>
      <h3>post comment</h3>
      <input type="text" value={comment} name="coment" />
      <label htmlFor="comment">comment</label>
      <button onClick={submitComment}>post comment</button>
    </div>
  );
}

export default PostComment;
