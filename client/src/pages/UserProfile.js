// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getToken } from "../utils/getToken";
import { getUserId } from "../utils/getUserId";
import HobbySelector from "../components/HobbySelector";

function UserProfile() {
  const [selectedfile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [profileUpdates, setProfileUpdates] = useState({});
  const [userHobbies, setUserHobbies] = useState([]);
  const [hobbyInput, setHobbyInput] = useState("");
  const token = getToken();

  const [userId, setUserId] = useState(null);
  // const [myHobbies, setMyHobbies] = useState(selectedHobbies);

  const availableHobbies = [
    "sports",
    "chess",
    "soccer",
    "basketball",
    "books",
    "politics",
  ];

  const handleHobbiesSelected = (selectedHobbies) => {
    console.log("Selected hobbies:", selectedHobbies);
    // setMyHobbies(selectedHobbies);
  };

  const userIdIs = () => {
    setUserId(getUserId());
  };

  const getProfile = () => {
    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      fetch("http://localhost:5000/api/users/userProfile", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("Profile fetch result: >>>>", result);
          setUserProfile({
            userId: result._id,
            userName: result.userName,
            firstName: result.firstName,
            surName: result.surName,
            birthDay: result.birthDay,
            eMail: result.eMail,
            userPicture: result.userPicture,
            roleBadge: result.roleBadge,
            hobbies: result.hobbies,
            topics: result.topics,
            comments: result.comments,
            likes: result.likes,
          });
          setError(null);
        })
        .catch((error) => console.log("error", error));
    } else {
      setError("You need to log in first!");
      console.log(error);
      setUser(null);
    }
  };

  const handlePictureAttachment = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handlePictureUpload = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("image", selectedfile);
    formdata.append("userId", userId);

    console.log("formData :>> ", formdata);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/imageUpload",
        requestOptions
      );

      const result = await response.json();
      console.log("🚀 ~ ~ result", result);
      setUser({ ...user, userPicture: result.userPicture });

      if (result) {
        getProfile();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUpdateInput = (e) => {
    setProfileUpdates({ ...profileUpdates, [e.target.name]: [e.target.value] });
  };

  const handleHobbyInput = (event) => {
    setHobbyInput(event.target.value);
    // console.log("🚀 ~ handleHobbyInput ~ setHobbyInput:", hobbyInput);
  };
  const addHobby = (e) => {
    e.preventDefault();
    if (hobbyInput.length > 0) {
      setUserHobbies([...userHobbies, hobbyInput]);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("firstName", profileUpdates.firstName);
    urlencoded.append("surName", profileUpdates.surName);
    urlencoded.append("birthDay", profileUpdates.birthDay);
    urlencoded.append("roleBadge", profileUpdates.roleBadge);
    // urlencoded.append("hobbies", myHobbies);
    console.log(urlencoded.get("hobbies"));
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    const userId = getUserId();
    console.log("🚀 ~ handleProfileUpdate ~ userId:", userId);

    fetch(`http://localhost:5000/api/users/${userId}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getProfile();
    userIdIs();
  }, [token]);

  return (
    <div>
      {error && <h2>{error}</h2>}

      {userProfile && (
        <main>
          <div className=" main text-center mb-5">
            <div className="container">
              <h1>User Profile</h1>
              <div
                className="form-group"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "30px",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <Form onSubmit={handlePictureUpload}>
                  <Form.Label htmlFor="file">
                    Choose a picture to upload
                  </Form.Label>
                  <Form.Control
                    onChange={handlePictureAttachment}
                    type="file"
                    id="file"
                    name="file"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                  <Button type="submit" id="submit">
                    Submit picture
                  </Button>
                </Form>

                <div className="userPicture">
                  {user ? (
                    <img
                      style={{
                        width: "150px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      src={userProfile.userPicture}
                    ></img>
                  ) : (
                    <img
                      style={{
                        width: "150px",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      src={
                        "https://www.pexels.com/tr-tr/fotograf/anemon-15402787/"
                      }
                    ></img>
                  )}
                </div>
              </div>
              <Form>
                <div className="form-group">
                  <label htmlFor="username">Username*</label>
                  <input
                    style={{ marginBottom: "0px" }}
                    type="text"
                    id="username"
                    name="userName"
                    defaultValue={userProfile.userName}
                    readOnly
                  />
                  <span style={{ marginTop: "0px", paddingTop: "0px" }}>
                    <i>*This field is not editable</i>
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  {userProfile.firstName ? (
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      defaultValue={userProfile.firstName}
                      onChange={handleUpdateInput}
                    />
                  ) : (
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      onChange={handleUpdateInput}
                      required
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="surname">Surname</label>
                  {userProfile.surName ? (
                    <input
                      type="text"
                      id="surName"
                      name="surName"
                      defaultValue={userProfile.surName}
                      onChange={handleUpdateInput}
                    />
                  ) : (
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      onChange={handleUpdateInput}
                      required
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    style={{ marginBottom: "0px" }}
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={userProfile.eMail}
                    onChange={handleUpdateInput}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="birthDay">Birthday</label>

                  {userProfile.birthDay ? (
                    <input
                      type="text"
                      id="birthDay"
                      name="birthDay"
                      defaultValue={userProfile.birthDay}
                      onChange={handleUpdateInput}
                    />
                  ) : (
                    <input
                      type="date"
                      id="birthDay"
                      name="birthDay"
                      onChange={handleUpdateInput}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="roleBadge">Role Badge</label>

                  {userProfile.roleBadge ? (
                    <select
                      id="roleBadge"
                      name="roleBadge"
                      onChange={handleUpdateInput}
                    >
                      <option value="Choose a badge..." disabled>
                        Choose a badge...
                      </option>
                      {userProfile.roleBadge === "Parent" ? (
                        <option value="parent" selected>
                          Parent
                        </option>
                      ) : (
                        <option value="parent">Parent</option>
                      )}
                      {userProfile.roleBadge === "Teacher" ? (
                        <option value="teacher" selected>
                          Teacher
                        </option>
                      ) : (
                        <option value="teacher">Teacher</option>
                      )}
                      {userProfile.roleBadge === "Senior" ? (
                        <option value="senior" selected>
                          Senior
                        </option>
                      ) : (
                        <option value="senior">Senior</option>
                      )}
                      {userProfile.roleBadge === "Pupil" ? (
                        <option value="pupil" selected>
                          Pupil
                        </option>
                      ) : (
                        <option value="pupil">Pupil</option>
                      )}
                      {userProfile.roleBadge === "Neighbor" ? (
                        <option value="neigbor" selected>
                          Neighbor
                        </option>
                      ) : (
                        <option value="neighbor">Neigbor</option>
                      )}
                    </select>
                  ) : (
                    <select
                      id="roleBadge"
                      name="roleBadge"
                      onChange={handleUpdateInput}
                      required
                    >
                      <option value="Choose a badge..." disabled>
                        Choose a badge...
                      </option>
                      <option value="parent">Parent</option>
                      <option value="teacher">Teacher</option>
                      <option value="senior">Senior</option>
                      <option value="pupil">Pupil</option>
                      <option value="neighbor">Neighbor</option>
                    </select>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="hobbies">Hobbies</label>
                  <div
                    className="input-group"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: "0",
                    }}
                  >
                    <HobbySelector
                      handleHobbiesSelected={handleHobbiesSelected}
                      availableHobbies={availableHobbies}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Button type="submit" onClick={handleProfileUpdate}>
                    Update Profile
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </main>
      )}
      <div className="footer">
        <p>&copy; 2023 My App. All rights reserved.</p>
      </div>
    </div>
  );
}

export default UserProfile;
