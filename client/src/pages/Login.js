import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getToken } from "../utils/getToken";

function Login() {
  const [loggedUser, setLoggedUser] = useState({});
  console.log("🚀 ~ Login ~ loggedUser:", loggedUser);

  const handleInputChange = (e) => {
    setLoggedUser({ ...loggedUser, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", loggedUser.email);
      urlencoded.append("password", loggedUser.password);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:5000/api/users/login",
        requestOptions
      );
      const result = await response.json();
      if (result.userToken) {
        localStorage.setItem("token", result.userToken);
        localStorage.setItem("id", result.user.id);
        setLoggedUser(result.user);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      console.log("You're LOGGED IN !");
    } else {
      console.log("You're NOT logged in !");
    }
  }, [loggedUser]);

  return (
    <div>
      <main className="main">
        <div className="container">
          <h1 className="text-center mb-5">User Login</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Log in
              </Button>
            </div>
          </Form>
        </div>
      </main>
      <footer className="footer mt-5">
        <div className="container">
          <p>&copy; 2023 Community App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
