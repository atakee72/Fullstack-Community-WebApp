import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function LandingPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <header></header>

      <section
        className="hero"
        style={{ display: "flex", alignItems: "center" }}
      >
        <Button className="p-3 w-25 actionBtn">
          <a
            style={{
              color: "white",
              fontSize: "1.5em",
              textDecoration: "none",
              fontWeight: "bold",
            }}
            href="./register"
          >
            Sign Up
          </a>
        </Button>
        <h1 style={{ writingMode: "vertical-lr" }} className="text-center mb-4">
          Connect with <br /> Your Community
        </h1>
        <p>
          Our app helps you connect with people in your local area, discover new
          events, and join local groups.
        </p>
      </section>

      <section
        className="about"
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
        }}
      >
        <h2 style={{ writingMode: "vertical-lr" }}>About Our App</h2>
        <p>
          Our app is designed to help people connect with their local community.
          With features such as event discovery, group creation, and community
          messaging, you can easily stay connected with the people and events in
          your area.
        </p>
      </section>

      <section
        className="features"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "gray",
        }}
      >
        <h2 style={{ writingMode: "vertical-lr" }}>Features</h2>
        <ul>
          <li>Event Discovery</li>
          <li>Group Creation</li>
          <li>Community Messaging</li>
        </ul>
      </section>

      <section className="call-to-action">
        <h2>Join Our Community</h2>
        <p>
          <Button>
            <a
              style={{ color: "white", textDecoration: "none" }}
              href="./register"
            >
              Sign Up
            </a>
          </Button>{" "}
          today to start connecting with your local community.
        </p>
      </section>

      <footer>
        <p>&copy; 2023 Local Community Web App</p>
        <nav>
          <ul>
            <li>
              <a href="/">Privacy Policy</a>
            </li>
            <li>
              <a href="/">Terms of Use</a>
            </li>
            <li>
              <a href="/">Contact Us</a>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}

export default LandingPage;
