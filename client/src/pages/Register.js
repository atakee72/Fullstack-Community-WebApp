import { useState } from "react";
import Button from "react-bootstrap/Button";

function Register() {
  const [newUser, setNewUser] = useState({});

  const handleInputChange = (e) => {
    // console.log("e.target.name, e.target.value", e.target.name, e.target.value); // sense each one separately
    setNewUser({ ...newUser, [e.target.name]: [e.target.value] }); // which is called "computed property names"
  };

  const signup = async (e) => {
    // Check email format, password length - avoid making useless requests
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("username", newUser.username);
      urlencoded.append("email", newUser.email);
      urlencoded.append("password", newUser.password);
      urlencoded.append(
        "userPicture",
        newUser.userPicture
          ? newUser.userPicture
          : "https://rugby.vlaanderen/wp-content/uploads/2018/03/Anonymous-Profile-pic.jpg"
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const newUserData = await response.json();
      console.log("🚀 ~ ~ newUserData", newUserData);
      console.log("🚀 ~ ~ response", response);
    } catch (error) {
      console.log("garip bir şeyler oldu burda!", error);
    }
  };

  return (
    <div>
      <main className="main">
        <div className="container">
          <h1 className="text-center mb-5">User Registration</h1>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <Button
                type="submit"
                value="Submit"
                constiant="primary"
                onClick={signup}
              >
                Sign Up!
              </Button>{" "}
            </div>
          </form>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; 2023 Community App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Register;
