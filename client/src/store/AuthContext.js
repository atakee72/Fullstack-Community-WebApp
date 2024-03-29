import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { getUserId } from "../utils/getUserId";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  // const [newUser, setNewUser] = useState({});

  const [serverMsg, setServerMsg] = useState("");

  // const [loggedUser, setLoggedUser] = useState({});
  const [loggedUser, setLoggedUser] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user : {};
  });
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
        "https://www.focusedu.org/wp-content/uploads/2018/12/circled-user-male-skin-type-1-2.png"
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
      setServerMsg(newUserData.msg);
      console.log("🚀 ~ ~ newUserData", newUserData);
      console.log("🚀 ~ ~ response", response);

      if (newUserData) {
        setTimeout(() => {
          redirectTo("/Login");
        }, 3000);
      }
    } catch (error) {
      console.log("garip bir şeyler oldu burda!", error);
      setServerMsg(error);
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
      setServerMsg(result.msg);
      if (result.userToken) {
        localStorage.setItem("token", result.userToken);
        localStorage.setItem("id", result.user.id);
        localStorage.setItem("user", JSON.stringify(result.user));
        setLoggedUser(result.user);
        setServerMsg(result.msg);

        setTimeout(() => {
          redirectTo("/");
        }, 3000);
      }
    } catch (error) {
      console.log("error", error);
      setServerMsg(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("user");
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
        serverMsg,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
