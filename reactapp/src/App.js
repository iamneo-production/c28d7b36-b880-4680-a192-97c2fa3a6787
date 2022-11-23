import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardAdmin from "./components/board-admin.component";
import Application from "./components/application.component";
import UserListApplication from "./components/user-list-application.component";
import AdminListApplication from "./components/admin-list-application.component";
import Verification from "./components/verification.component";
import PDFReader from "./components/PDFReader"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import UserRoute from "./components/UserRoute"
import UploadFiles from "./components/upload-files.component"
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    //console.log(props);
    this.state = {
      showAdminBoard: false,
      currentUser: undefined,
    };
    history.listen((location) => {
      console.log("change");
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    //const user = JSON.parse(localStorage.getItem("user"));
    const user = this.props.user;
    //console.log(user);
    if (user) {
      this.setState({
        currentUser: user,
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showAdminBoard: false,
      currentUser: undefined,
    });
  }


  render() {
    //console.log(this.props.user);
    let admin = false;
    let user = false;
    if(this.props.user){
      if(this.props.user.roles[0] == "ROLE_ADMIN")
        admin = true;
      else
        user = true;
    }
    //console.log(showAdminBoard);
    // if(currentUser){
    //   console.log(showAdminBoard);
    //   //this.setUser();
    //   //console.log(currentUser);
    // }

    return (
      <BrowserRouter history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              E Driving
            </Link>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Home
                </Link>
              </li>
              { admin && (
                <li className="nav-item">
                  <Link to={"/adminlist"} className="nav-link">
                    Verification
                  </Link>
                </li>
              )}
              { user && (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/apply"} className="nav-link">
                      Apply
                    </Link>
                  </li>                
                  <li className="nav-item">
                    <Link to={"/userlist"} className="nav-link">
                      Track
                    </Link>
                  </li>
                </div>
              )}

            </div>

            {this.props.user ? (
              <div className="navbar-nav ml-auto">
                
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Routes>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/user" element={<Profile />} />                
              </Route>
              <Route element={<AdminRoute/>}>
                <Route exact path="/adminlist" element={<AdminListApplication />} />
                <Route path="/admin" element={<BoardAdmin />} />
                <Route exact path="/verification/:id" element={<Verification />} />
                <Route exact path="/document/:id" element={<PDFReader />} />
              </Route>
              <Route element={<UserRoute/>}>
                <Route exact path="/apply" element={<Application />} />
                <Route exact path="/upload" element={<UploadFiles />} />
                <Route exact path="/userlist" element={<UserListApplication />} />
              </Route>
            </Routes>
          </div>

          { <AuthVerify logOut={this.logOut}/> }
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);