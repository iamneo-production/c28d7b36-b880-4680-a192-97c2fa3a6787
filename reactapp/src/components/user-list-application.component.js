import React, { Component } from 'react';
import ApplicationCard from "./application-card"
import ApplicationService from "../services/application.service"
import Spinner from 'react-bootstrap/Spinner';
import AuthService from "../services/auth.service"

class UserListApplication extends Component {

    constructor(props){
        super(props);
        this.state={
            applications: [],
            id: '',
            message: "",
            flag: false,
        }
    }
    componentDidMount(){
        ApplicationService.getUserId().then((res) => {
            this.setState({
              id: res.data,
            });
            ApplicationService.listByUserId(this.state.id).then((res) => {
                this.setState({
                  applications: res.data,
                  flag: true,
                });
              })
              .catch(() => {
                this.setState({
                  message: "No Applications for this User",
                  flag: false,
                });
              });
          })
          .catch(() => {
            AuthService.logout();
          });
    }
        render(){
            let applicationElement;
            const applications = this.state.applications;
            const flag = this.state.flag;
            const message = this.state.message;
            if(this.state.applications[0]){
                //console.log(applications[0]);
            if(!applications){
                applicationElement = "empty";
            } else{
                applicationElement = applications.map((application, k) => <ApplicationCard application={application} key={k} />);
            }
            }
            if(!flag){
                return(
                    <div className="alert alert-light" role="alert">
                        {message}
                    </div>
                )
            }
            else{
                if(!applicationElement){
                        return (
                        <div class="d-flex align-items-center" style={{padding: "250px 550px"}}>
                        <Spinner animation="grow" role="status" variant="secondary" style={{ width: "10rem", height: "10rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </div>
                        );
                }
                else{
                return(
                    <div>
                        {applicationElement}
                    </div>
                );
                }
            }
        }
}

export default UserListApplication;
