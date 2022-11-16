import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';


const VerificationCard = (props) => {
  const application = props.application;
  const address = props.address;
  console.log(application);
  console.log(address);
  const navigate = useNavigate();
  let statusStyle ={
    bgcolor: 'green',
  };
  if(application.status == "IN PROGRESS")
  statusStyle ={
    bgcolor: 'yellow',
  };
  else if(application.status == "REJECTED")
  statusStyle ={
    bgcolor: 'red',
  };
  else
  statusStyle ={
    bgcolor: 'green',
  };
  //console.log(authHeader().Authorization);
  const rejectStatus = () => {
    axios.put(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/edit/status?id=${application.id}`,"REJECTED", { headers: {'Content-Type': 'text/plain', 'Authorization': `${authHeader().Authorization}`} })
            .then(res => {
              console.log(res.data);            
              })
            .catch((err) => {
                console.log('error');
            });
  }

  const acceptStatus = () => {
    axios.put(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/app/edit/status?id=${application.id}`,"ACCEPTED", { headers: {'Content-Type': 'text/plain', 'Authorization': `${authHeader().Authorization}`} })
            .then(res => {
              console.log(res.data);            
              })
            .catch((err) => {
                console.log('error');
            });
  }

if(!address.id){
  return(null);
}
else{
  return (
    <div className="card-container" style={{ display: "flex" }}>
     <Grid container spacing={5} justifyContent="center">
      <Grid item xs={8}>
      <Link to={`/verification/${application.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: '100%', height: '100%' }} style={{flex:1, backgroundColor: '#FFD580', height: "45vw"}}>
          <CardActionArea>
                <CardContent>
                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Name: {application.firstName} {application.lastName}   
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Father Name: {application.fatherName}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Gender: {application.gender}
                  </Typography>
                  
                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Phone No: {application.phoneNumber1}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Email: {application.email}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicantion ID: {application.id}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Aadhar: {application.aadharNumber} 
                  </Typography>

                  <Typography sx={{ fontSize: 25 }} gutterBottom>
                    Applicant Address: {address.houseNo}, {address.streetName}, {address.areaName}, {address.city}, {address.state}, PINCODE: {address.pincode}
                  </Typography>
                </CardContent>
                </CardActionArea>
              </Card>
            </Link>
      </Grid>
      <Grid item xs ={4}>
        <Card sx={{ width: '100%', height: '100%' }} style={{flex:2, backgroundColor: 'lightpurple'}}>
        <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Email: {application.email}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicantion ID: {application.id}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Aadhar: {application.aadharNumber} 
                  </Typography>
            <CardActions>
                <Button class="btn btn-success btn-lg" onClick = {acceptStatus}>Accepted</Button>
                
            </CardActions>
            <CardActions>
                
                <Button class="btn btn-danger btn-lg" onClick = {rejectStatus}>Rejected</Button>
            </CardActions>
        </Card>
      </Grid>
      </Grid>
    </div>
  );
}
};

export default VerificationCard;