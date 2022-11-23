import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../services/auth.service"

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.roles[0]);
  let auth = true;
 
  if(user !=null){
    const decodedJwt = parseJwt(user.accessToken);
    if (decodedJwt.exp * 1000 > Date.now()) {
      auth = true;
    }
    else{
      auth = false;
      AuthService.logout();
    }
  }
  else{
    auth = false;
  }
  return ( auth ? <Outlet/> : <Navigate to="/login" />);
  
}

export default ProtectedRoute;