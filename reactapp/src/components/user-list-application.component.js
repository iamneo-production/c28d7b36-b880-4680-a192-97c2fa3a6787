import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";
import ApplicationCard from "./application-card"
import { Navigate } from 'react-router-dom';

class UserListApplication extends Component {

    constructor(props){
        super(props);
        this.state={
            applications: [],
        }
    }
    componentDidMount(){
        axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/auth/id`, { headers: authHeader() })
          .then(res => {
            console.log(res.data);
            axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/list/user/?userId=${res.data}`, { headers: authHeader() })
            .then(res => {
                console.log(res.data[0]);
                this.setState({
                    applications: res.data,
                });
            })
          .catch((err) => {
              console.log('error');
          });
          })
          .catch((err) => {
              console.log('error');
          })

            
    }
        render(){
            // const { isLoggedIn, message } = this.props;
            // console.log(isLoggedIn);
            // if (!isLoggedIn) {
            //     return <Navigate to="/login" />;
            // }
            let applicationElement;
            const applications = this.state.applications;
            if(this.state.applications[0]){
                console.log(applications[0]);
            if(!applications){
                applicationElement = "empty";
            } else{
                applicationElement = applications.map((application, k) => <ApplicationCard application={application} key={k} />);
            }
            }

            return(
                <div>
                    {applicationElement}
                </div>
            );
        
        }
}

export default UserListApplication;
