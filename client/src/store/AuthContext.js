import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { getUserId } from "../utils/getUserId";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  // const [newUser, setNewUser] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const [loader, setLoader] = useState(true);
  const redirectTo = useNavigate();
  const userId = getUserId();

  const register = async (e, username, email, password) => {
    // Check email format, password length - avoid making useless requests
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("username", username);
      urlencoded.append("email", email);
      urlencoded.append("password", password);
      urlencoded.append(
        "userPicture",
        "https://rugby.vlaanderen/wp-content/uploads/2018/03/Anonymous-Profile-pic.jpg"
      );

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        requestOptions
      );
      const newUserData = await response.json();
      console.log("🚀 ~ ~ newUserData", newUserData);
      console.log("🚀 ~ ~ response", response);
      alert("🚀 Registered successfully! Please login to continue! 🚀");
      redirectTo("/Login");
    } catch (error) {
      console.log("garip bir şeyler oldu burda!", error);
    }
  };

  const login = async (e, email, password) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("email", email);
      urlencoded.append("password", password);

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
      console.log("result, login:", result);
      if (result.userToken) {
        localStorage.setItem("token", result.userToken);
        localStorage.setItem("id", result.user.id); //! Gerekiyor mu?
        setLoggedUser(result.user);
        alert("🚀 You are logged in! 🚀");
        redirectTo("/");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setLoggedUser(false);
    console.log("You're logged out!");
    alert("🚀 You're logged out! 🚀");
    redirectTo("/");
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
    <AuthContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        login,
        logout,
        register,
        loader,
        setLoader,
        userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
