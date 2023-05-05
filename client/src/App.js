// import { useEffect, useState } from "react";
import "./App.css";
import "./HobbySelector.css";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import NoMatch from "./pages/NoMatch";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
// import Button from "react-bootstrap/Button";
import { AuthContextProvider } from "./store/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/landingPage";

  return (
    <div className="App" style={{ backgroundColor: "#eccc6e" }}>
      <AuthContextProvider>
        <header>{showNavbar && <Navbar />}</header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="userProfile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route path="landingPage" element={<LandingPage />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
      </AuthContextProvider>
    </div>
  );
}

export default App;
