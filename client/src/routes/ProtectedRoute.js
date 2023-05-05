import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext";
import { getToken } from "../utils/getToken";

function ProtectedRoute({ children }) {
  console.log("children of the protected :>> ", children);

  const isAuthenticated = getToken();

  // const { userId, loader } = useContext(AuthContext);
  const redirectTo = useNavigate();

  // const isUser = userId ? true : false;

  // //   //Option 2 (with a utility component):
  // //   // const isUser = isAuth(user);

  // //   //Option 3 (with a custom (own) hook):
  // //   const isUser = useIsAuth(); // no need to pass the "user" variable, it already takes it (from) elsewhere..

  return (
    <>
      {
        // loader ? (
        // <p>...loading...</p>
        // ) :
        isAuthenticated
          ? children
          : setTimeout(() => {
              redirectTo("/Login");
            }, 2000)
      }
    </>
  ); //Eğer login veya logout süreci devam ediyor ise, sadece ...loading...'i göster, eğer o süreçler bitmişse, yine (de) kontrol et user var mı yok mu diye ve varsa "children"e girmeye izin ver, yoksa homepage'e yönlendir.
}

export default ProtectedRoute;
