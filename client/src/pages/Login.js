import { useContext, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../store/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      <main className="main">
        <div className="container">
          <h1 className="text-center mb-5">User Login</h1>
          {/* <Form onSubmit={(e) => login(e, email, password)}> */}
          <Form
            onSubmit={(e) =>
              login(e, emailRef.current.value, passwordRef.current.value)
            }
          >
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                // value={email}
                ref={emailRef}
                placeholder="Enter email"
                // onChange={handleInputChange}
                // onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={passwordRef}
                placeholder="Password"
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
