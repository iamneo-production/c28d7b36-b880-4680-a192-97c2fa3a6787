import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  //console.log(user.roles[0]);
  let auth = true;
  if(!user)
    auth = false;

  return ( auth ? <Outlet/> : <Navigate to="/login" />);
  
}

export default ProtectedRoute;