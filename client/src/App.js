import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import NoMatch from "./pages/NoMatch";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Button from "react-bootstrap/Button";

function App() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/all");
      const data = await response.json();
      console.log("response >>>", response);
      console.log("data :>>>", data);
      setUsers(data.allUsers); //hook veya util yaparsan, bunu kaldir!
    } catch (error) {
      console.log("error", error);
    }
  };

  // const logout = () => {
  //   localStorage.removeItem("token");
  //   // setLoggedUser(null);
  // };

  // useEffect(() => {
  //   fetchData();
  //   const token = getToken();
  //   if (token) {
  //     console.log("You're LOGGED IN !");
  //   } else {
  //     console.log("You're NOT logged in !");
  //   }
  // }, []);

  return (
    <div className="App">
      <header>
        {/* <Button
          type="submit"
          value="Submit"
          constiant="primary"
          onClick={logout}
          style={{ backgroundColor: "tomato" }}
        >
          Logout!
        </Button>{" "} */}
        <Navbar />
        {/* <p>
          <code>{JSON.stringify(users, null, " \n \t")}</code>
        </p> */}
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
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
