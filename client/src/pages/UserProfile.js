import React, { useState } from "react";

function UserProfile() {
  const [selectedfile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({});

  const handleAttachment = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedfile);

    console.log("formData :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );

      const result = await response.json();
      console.log("🚀 ~ ~ result", result);
      setUser({ ...user, userPicture: result.userPicture });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div>
      <h1>User Profile</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          justifyContent: "space-evenly",
        }}
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">Choose a picture to upload</label>
          <br />
          <input type="file" name="file" onChange={handleAttachment} />
          <button type="submit">Submit picture</button>
        </form>
        <div>
          {user && (
            <img
              src={user.userPicture}
              alt="A visual file ploaded by the current user"
            ></img>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
