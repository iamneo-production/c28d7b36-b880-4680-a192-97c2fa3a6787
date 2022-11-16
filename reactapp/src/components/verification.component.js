import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";
import axios from 'axios';
import VerificationCard from "./verification-card"

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


class Verification extends Component {
  constructor(props){
    super(props);
    this.state ={
      application: {
        aadharNumber: "",
        email: "",
        fatherName: "",
        firstName: "",
        gender: "",
        id: "",
        lastName: "",
        phoneNumber1: "",
        status: "",
      },
      address: {
        areaName: "",
        city: "",
        houseNo: "",
        id: "",
        pincode: "",
        state: "",
        streetName: "",
        type: "",
      },
    }
  }
  
  componentDidMount(){
    let { id } = this.props.params;
    console.log(id);
    axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/fetch/?id=${id}`, { headers: authHeader() })
            .then(res => {
                console.log(res.data);
                this.setState({
                    application: {
                      aadharNumber: res.data.aadharNumber,
                      email: res.data.email,
                      fatherName: res.data.fatherName,
                      firstName: res.data.firstName,
                      gender: res.data.gender,
                      id: res.data.id,
                      lastName: res.data.lastName,
                      phoneNumber1: res.data.phoneNumber1,
                      status: res.data.status,
                    }
                });
                console.log(this.state.application.id);
                axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/address/list/app/?appId=${this.state.application.id}`, { headers: authHeader() })
                .then(res => {
                    console.log(res.data);
                    this.setState({
                      address:{
                        areaName: res.data.areaName,
                        city: res.data.city,
                        houseNo: res.data.houseNo,
                        id: res.data.id,
                        pincode: res.data.pincode,
                        state: res.data.state,
                        streetName: res.data.streetName,
                        type: res.data.type,
                      }
                    })

                    
                })
                .catch((err) => {
                    console.log('error');
                });
  
                
            })
          .catch((err) => {
              console.log('error');
          });
  }
  render() {
    let verificationElement = "empty";
  //   const application = this.state.application;
  //   const address = this.state.address;
  //   console.log(this.state.application);
  //   if(this.state.address){
  //       console.log(application);
  //       console.log(address);
    
  //   if(!application || !address){
  //       verificationElement = "empty";
  //       console.log("empty");
  //   } else{
  //       console.log("oi");
  //       verificationElement = <VerificationCard application={this.state.application} address={this.state.address}/>;
  //   }
  // }
  verificationElement = <VerificationCard application={this.state.application} address={this.state.address}/>;

    return (
      <div>
        {verificationElement}
      </div>
    );
  }
}



export default withParams(Verification);