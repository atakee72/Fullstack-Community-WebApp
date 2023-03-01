import { useRef, useContext } from "react";
import Button from "react-bootstrap/Button";
import { AuthContext } from "../store/AuthContext";

function Register() {
  const { register } = useContext(AuthContext);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

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
                ref={usernameRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                ref={emailRef}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                ref={passwordRef}
                required
              />
            </div>
            <div className="form-group">
              <Button
                type="submit"
                value="Submit"
                constiant="primary"
                onClick={(e) =>
                  register(
                    e,
                    usernameRef.current.value,
                    emailRef.current.value,
                    passwordRef.current.value
                  )
                }
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
