import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import NoMatch from "./pages/NoMatch";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/all");
      const data = await response.json();
      console.log("response >>>", response);
      console.log("data :>>>", data);
      setUsers(data.allUsers);          //hook veya util yaparsan, bunu kaldir!
    } catch (error) {
      console.log("error", error);
    } 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <Navbar />
        {/* <p>
          <code>{JSON.stringify(users, null, " \n \t")}</code>
        </p> */}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="landingPage" element={<LandingPage />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
