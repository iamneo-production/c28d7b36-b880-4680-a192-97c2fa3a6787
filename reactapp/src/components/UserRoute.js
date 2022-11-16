import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function UserRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.roles[0]);
  let auth = false;
  if(user.roles[0] == "ROLE_USER")
    auth = true;

  return ( auth ? <Outlet/> : <Navigate to="/profile" />);
  
}

export default UserRoute;