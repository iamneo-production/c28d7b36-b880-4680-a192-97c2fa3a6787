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

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  let auth = false;
  if(user != null){
    const decodedJwt = parseJwt(user.accessToken);
      // console.log(Date.now());
      // console.log(decodedJwt.exp*1000);
    if (decodedJwt.exp * 1000 > Date.now()) {
      if(user.roles[0] == "ROLE_ADMIN"){
        auth = true;
        return(<Outlet/>);
      }
      else{
        return(<Navigate to="/profile" />);
      }
    }
    else{
      auth = false;
      //return(<Navigate to="/login" />)
      AuthService.logout();
    }
  }
  else{
    auth = false;
    //return(<Navigate to="/profile" />)
  }
  return ( auth ? <Outlet/> : <Navigate to="/profile" />);
  
}

export default AdminRoute;