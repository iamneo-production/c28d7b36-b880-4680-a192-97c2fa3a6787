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
import AdminApplicationCard from "./admin-application-card"
import { Navigate } from 'react-router-dom';

export default class AdminListApplication extends Component {

    constructor(props){
        super(props);
        this.state={
            applications: [],
            address: [],
        }
    }
    componentDidMount(){
        axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/auth/id`, { headers: authHeader() })
          .then(res => {
            console.log(res.data);
            axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/list`, { headers: authHeader() })
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
            let applicationElement;
            const applications = this.state.applications;
            if(this.state.applications[0]){
                console.log(applications[0]);
            if(!applications){
                applicationElement = "empty";
            } else{
                applicationElement = applications.map((application, k) => <AdminApplicationCard application={application} key={k} />);
            }
            }
            // if(!applications){
            //     applicationElement = "empty";
            // } else{
            //     applicationElement = applications[0];
            // }
            return(
                <div>
                    {applicationElement}
                </div>
            );
        //     axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/auth/id`, { headers: authHeader() })
        //   .then(res => {
        //     console.log(res.data);
        //     axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/list/${res.data}`, { headers: authHeader() })
        //     .then(res => {
        //         console.log(res.data);

        //     })
        //   .catch((err) => {
        //       console.log('error');
        //   });
        //   })
        //   .catch((err) => {
        //       console.log('error');
        //   })

        //     )
        }
}