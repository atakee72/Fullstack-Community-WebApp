import React, { useContext, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getToken } from "../utils/getToken";
import { getUserId } from "../utils/getUserId";
import HobbySelector from "../components/HobbySelector";
import { AuthContext } from "../store/AuthContext";

function UserProfile(selectedHobbies) {
  const [selectedfile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [profileUpdates, setProfileUpdates] = useState({});
  const token = getToken();

  const userId = useContext(AuthContext);

  // const [myHobbies, setMyHobbies] = useState(selectedHobbies);

  const availableHobbies = [
    "sports",
    "chess",
    "soccer",
    "basketball",
    "books",
    "politics",
  ];

  const fNameRef = useRef();
  const sNameRef = useRef();
  const bDayRef = useRef();
  const rBadgeRef = useRef();
  // const hobbiesRef = useRef();
  const [fName, setFName] = useState("");
  const [sName, setSName] = useState("");
  const [bDay, setBDay] = useState();
  const [rBadge, setRBadge] = useState("");
  const [hobbies, setHobbies] = useState([""]);

  const handleHobbiesSelected = (selectedHobbies) => {
    console.log("Selected hobbies:", selectedHobbies);
    // setMyHobbies(selectedHobbies);
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

  //! BUNLARI SİLECEGİZ BELLİ Kİ ============================================================?????????????????

  // const handleUpdateInput = (e) => {
  //   setProfileUpdates({ ...profileUpdates, [e.target.name]: [e.target.value] });
  //   console.log(
  //     "🚀 ~ handleUpdateInput ~ setProfileUpdates:",
  //     setProfileUpdates
  //   );
  // };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("firstname", profileUpdates.firstname);
    urlencoded.append("surname", profileUpdates.surname);
    urlencoded.append("birthday", profileUpdates.birthday);
    urlencoded.append("rolebadge", profileUpdates.rolebadge);
    urlencoded.append("hobbies", selectedHobbies);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    // const userId = getUserId();
    // console.log("🚀 ~ handleProfileUpdate ~ userId:", userId);

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        requestOptions
      );
      const updatedUserInfo = await response.json();
      console.log(updatedUserInfo);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getProfile();
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
                  <span
                    style={{
                      marginTop: "0px",
                      paddingTop: "0px",
                      fontSize: "0.8rem",
                    }}
                  >
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
                      value={fName}
                      defaultValue={userProfile.firstName}
                      ref={fNameRef}
                      onChange={(event) => setFName(event.target.value)}
                    />
                  ) : (
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={fName}
                      ref={fNameRef}
                      onChange={(event) => setFName(event.target.value)}
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
                      // onChange={handleUpdateInput}
                      ref={sNameRef}
                    />
                  ) : (
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      // onChange={handleUpdateInput}
                      ref={sNameRef}
                      required
                    />
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email*</label>
                  <input
                    style={{ marginBottom: "0px" }}
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={userProfile.eMail}
                    // onChange={handleUpdateInput}
                    readOnly
                  />
                  <span
                    style={{
                      marginTop: "0px",
                      paddingTop: "0px",
                      fontSize: "0.8rem",
                    }}
                  >
                    <i>*This field is not editable</i>
                  </span>
                </div>

                <div className="form-group">
                  <label htmlFor="birthDay">Birthday</label>

                  {userProfile.birthDay ? (
                    <input
                      type="text"
                      id="birthDay"
                      name="birthDay"
                      defaultValue={userProfile.birthDay}
                      // onChange={handleUpdateInput}
                      ref={bDayRef}
                    />
                  ) : (
                    <input
                      type="date"
                      id="birthDay"
                      name="birthDay"
                      // onChange={handleUpdateInput}
                      ref={bDayRef}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="roleBadge">Role Badge</label>

                  {userProfile.roleBadge ? (
                    <select
                      id="roleBadge"
                      name="roleBadge"
                      // onChange={handleUpdateInput}
                      ref={rBadgeRef}
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
                      // onChange={handleUpdateInput}
                      ref={rBadgeRef}
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
                      padding: "5%",
                      margin: "5%",
                      border: "1px dashed gray",
                      minWidth: "400px",
                      backgroundColor: "black",
                    }}
                  >
                    <HobbySelector
                      handleHobbiesSelected={handleHobbiesSelected}
                      availableHobbies={availableHobbies}
                      // ref={hobbiesRef}
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
