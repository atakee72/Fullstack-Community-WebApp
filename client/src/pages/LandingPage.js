import React from "react";
import { Button } from "react-bootstrap";

function LandingPage() {
  return (
    <div
      style={{
        height: "50vh",
      }}
    >
      <main
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "baseline",
          alignContent: "stretch",
          // height: "100vh",
        }}
      >
        <section className="hero mb-0 pb-0 pt-5" style={{ width: "33%" }}>
          <h1 style={{ writingMode: "vertical-rl" }} className=" mb-2">
            About Our App
          </h1>
          <p>
            The community app is designed to help people connect with their
            local community. Our app helps you connect with people in your local
            area, discover new events, and join local groups.
          </p>
        </section>

        <section
          className="about"
          style={{
            flexGrow: "1",
            width: "33%",
          }}
        >
          <h1 className=" mb-2 pt-5" style={{ writingMode: "vertical-rl" }}>
            Connect with <br /> Your Community
          </h1>
          <p>
            With features such as event discovery, group creation, and community
            messaging, you can easily stay connected with the people and events
            in your area.
          </p>
        </section>

        <section
          className="features"
          style={{
            display: "flex",
            // alignItems: "center",
            // alignContent: "stretch",
            justifyContent: "flex-end",
            width: "33%",
            flexDirection: "column",
            // height: "100%",
            position: "relative",
            // top: "0",
            bottom: "0",
          }}
        >
          <div style={{ display: "flex", alignItems: "evenly" }}>
            <h1
              className="text-center mb-2 pt-5"
              style={{ writingMode: "vertical-lr" }}
            >
              Features
            </h1>
            <ul>
              <li>Event Discovery</li>
              <li>Group Creation</li>
              <li>Community Messaging</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="pt-1 m-0">
        <section className="call-to-action">
          <h2>Join Our Community</h2>
          <p>
            <Button
              style={{
                color: "#eccc6e",
                backgroundColor: "#4b9aaa",
                border: "none",
              }}
            >
              <a
                style={{
                  textDecoration: "none",
                  color: "#eccc6e",
                }}
                href="./register"
              >
                Sign Up
              </a>
            </Button>{" "}
            today to start connecting with your local community.
          </p>
        </section>
        <p className="p-0 m-0">&copy; 2023 Local Community Web App</p>
        {/* <nav style={{ display: "flex", justifyContent: "center" }}>
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
        </nav> */}
      </footer>
    </div>
  );
}

export default LandingPage;
