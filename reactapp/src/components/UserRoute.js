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

function UserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.roles[0]);
  let auth = false;
  if(user != null){
    const decodedJwt = parseJwt(user.accessToken);
    if (decodedJwt.exp * 1000 > Date.now()) {
      if(user.roles[0] == "ROLE_USER"){
        auth = true;
        return(<Outlet/>);
      }
    }
    else{
      //return(<Navigate to="/profile" />)
      auth = false;
      AuthService.logout();
    }
  }
  else{
    auth = false;
    //return(<Navigate to="/profile" />)
  }
  return ( auth ? <Outlet/> : <Navigate to="/login" />);
  
}

export default UserRoute;