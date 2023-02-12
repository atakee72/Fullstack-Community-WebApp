import { useEffect, useState } from "react";
import "./App.css";
import LandingPage from "./screens/LandingPage";

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
      <p>
        <code>{JSON.stringify(users, null, " \n \t")}</code>
      </p>
      <LandingPage />
    </div>
  );
}

export default App;
