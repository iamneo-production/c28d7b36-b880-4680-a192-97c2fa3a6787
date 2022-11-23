import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
class Profile extends Component {

  render() {
    const { user: currentUser } = this.props;
    if(currentUser){
      if(currentUser.roles == "ROLE_ADMIN"){
        return (
        <div className="container">
          <header className="jumbotron">
          <h2>Welcome ADMIN to E Driving License Platform</h2>
          <p>Click on Verification to view all Applications to verify</p>
          </header>
        </div>
        );
      }
      else if(currentUser.roles == "ROLE_USER"){
      return (
        <div className="container">
        <header className="jumbotron">
        <h2>Welcome {currentUser.username} to E Driving License Platform</h2>
        <p>Click on Apply to make a new Driving License Application</p>
        <p>Click on Track to list and Track status of existing Applications</p>
        </header>
        </div>
      );
      }
    }
    else if (!currentUser) {
      return (
        <div className="container">
          <header className="jumbotron">
            <h2>Welcome E Driving License Platform</h2>
            <h3>Please Log In to Apply for Driving License</h3>
          </header>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);