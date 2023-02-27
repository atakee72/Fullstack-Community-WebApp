import React, { useState } from "react";

function PostComment() {
  const [comment, setComment] = useState("");
  const submitComment = () => {
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
