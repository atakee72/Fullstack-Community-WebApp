import React from "react";

function LandingPage() {
  return (
    <div>
      <header></header>

      <section id="hero">
        <h2>Connect with Your Community</h2>
        <p>
          Our app helps you connect with people in your local area, discover new
          events, and join local groups.
        </p>
      </section>

      <section id="about">
        <h2>About Our App</h2>
        <p>
          Our app is designed to help people connect with their local community.
          With features such as event discovery, group creation, and community
          messaging, you can easily stay connected with the people and events in
          your area.
        </p>
      </section>

      <section id="features">
        <h2>Features</h2>
        <ul>
          <li>Event Discovery</li>
          <li>Group Creation</li>
          <li>Community Messaging</li>
        </ul>
      </section>

      <section id="call-to-action">
        <h2>Join Our Community</h2>
        <p>
          <a href="/">Sign Up</a> today to start connecting with your local
          community.
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
