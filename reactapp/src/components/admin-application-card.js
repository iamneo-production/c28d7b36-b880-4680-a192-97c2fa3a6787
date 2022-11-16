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


const AdminApplicationCard = (props) => {
  const application = props.application;
  //console.log(application);
  const navigate = useNavigate();
//   this.state={
//     address: {
//       houseNo: '000',
//     }
// }
// const [address, setAddress] = useState({
//   houseNo:'',
// });
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

  
  //   axios.get(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/address/list/app/?appId=${application.id}`, { headers: authHeader() })
  //               .then(res => {
  //                   //console.log(res.data);
  //                   // this.updateState = () => this.setState({
  //                   //     address: ({houseNo : res.data.houseNo})
  //                   // });
  //                   setAddress({
  //                     houseNo:res.data.houseNo,
  //                   });
                    
  //               })
  //               .catch((err) => {
  //                   console.log('error');
  //               });
  
  // let addressElement;
  //console.log(address);
  // const address = this.state.address;
  // if(this.state.address){
  //   console.log(address)
  // }
  // if(!address){
  //   addressElement = "empty";
  // }else{
  //   addressElement = this.state.address.houseNo + " " + this.state.address.streetName;
  // }


  return (
    <div className="card-container" style={{ padding: 15 }}>
      <Grid container spacing={10} justifyContent="center">
      <Grid item xs={12}>
      <Link to={`/verification/${application.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ minWidth: 275 }} style={{flex:1, backgroundColor:'lightgray'}}>
          <CardActionArea>
                <CardContent>
                  <Typography sx={{ fontSize: 17 }} gutterBottom>
                    Applicant Name: {application.firstName} {application.lastName} &emsp; Applicant Phone No: {application.phoneNumber1}
                    
                  </Typography>
                  <Typography sx={{ fontSize: 17 }} gutterBottom>
                    Applicant ID: {application.id} &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &nbsp; Application Email: {application.email}
                    
                  </Typography>
                  <Typography sx={{ fontSize: 17 }} gutterBottom>
                    Applicant Aadhar: {application.aadharNumber} 
                    
                  </Typography>
                  <span>
                  <Typography sx={statusStyle} style={{ padding: 5 }} display="inline">
                    
                    {application.status} 
                   
                  </Typography>
                  </span>
                </CardContent>
                </CardActionArea>
              </Card>
            </Link>
      </Grid>
      </Grid>
    </div>
  );
};

export default AdminApplicationCard;