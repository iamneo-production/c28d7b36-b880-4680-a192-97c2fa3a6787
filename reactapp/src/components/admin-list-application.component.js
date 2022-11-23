import React, { Component } from 'react';
import AdminApplicationCard from "./admin-application-card"
import ApplicationService from "../services/application.service"
import Spinner from 'react-bootstrap/Spinner';
import AuthService from "../services/auth.service"

export default class AdminListApplication extends Component {

    constructor(props){
        super(props);
        this.state={
            applications: [],
            address: [],
        }
    }
    componentDidMount(){
        ApplicationService.listApplications().then((res) => {
            this.setState({
              applications: res.data,
            });
          })
          .catch(() => {
            AuthService.logout();
          });
            
    }
        render(){
            let applicationElement;
            let applicationList = [];
            let j=0;
            const applications = this.state.applications;
            if(this.state.applications[0]){
                //console.log(applications[0]);
                for(let i=0;i < applications.length;i++){
                    if(applications[i].status == "IN PROGRESS"){
                        applicationList[j++] = applications[i];
                    }
                }
            if(!applications){
                applicationElement = "empty";
            } else{
                applicationElement = applicationList.map((application, k) => <AdminApplicationCard application={application} key={k} />);
            }
            }
            // if(!applications){
            //     applicationElement = "empty";
            // } else{
            //     applicationElement = applications[0];
            // }
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