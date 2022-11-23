import React, { Component } from "react";
import { useParams } from "react-router-dom";
import VerificationCard from "./verification-card"
import ApplicationService from "../services/application.service"
import FileService from "../services/file.service"
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
      picture: "",
      picdata: "",
    }
  }
  
  componentDidMount(){
    let { id } = this.props.params;
    //console.log(id);
    ApplicationService.fetchById(id).then(res => {
                //console.log(res.data);
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
      
                ApplicationService.fetchAddressByApplicationId(this.state.application.id).then(res => {
                    //console.log(res.data);
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
                
                FileService.getImageUrl(this.state.application.id).then(res => {
                  this.setState({
                    picture: res.data.url,
                  })
                  FileService.getImageString(this.state.picture).then(response => {
                    this.setState({
                      picdata: `data:image/jpeg;base64,${new Buffer(response.data, "binary").toString("base64")}`,
                    })
                    //console.log(this.picdata);
                  })
                  .catch((err) => {
                    console.log('error');
                  });
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
  verificationElement = <VerificationCard application={this.state.application} address={this.state.address} picture={this.state.picdata}/>;

    return (
      <div>
        {verificationElement}
      </div>
    );
  }
}



export default withParams(Verification);