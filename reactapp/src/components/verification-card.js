import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from "react-router-dom";
import CardMedia from '@mui/material/CardMedia';
import ApplicationService from "../services/application.service"
import Spinner from 'react-bootstrap/Spinner';

const VerificationCard = (props) => {
  const application = props.application;
  const address = props.address;
  const picture = props.picture;
  const navigate = useNavigate();
  // console.log(application);
  // console.log(address);
  //console.log(picture);
  //var encodedStringBtoA;


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
    ApplicationService.updateStatus(application.id, "REJECTED").then((res) => {
      navigate("/adminlist",{state:{refresh:true}});
    });

    
  }

  const acceptStatus = () => {
    ApplicationService.updateStatus(application.id, "ACCEPTED").then((res) => {
      navigate("/adminlist",{state:{refresh:true}});
    });
  }

  const document = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
      //navigate(`/document/${application.id}`);
  }
// if(picture){
//   url = URL.createObjectURL(picture);
//   console.log(url);
// }
//console.log("data:image/png;base64," + picture);
if(!address.id || !picture){
  return (
    <div class="d-flex align-items-center" style={{padding: "250px 550px"}}>
    <Spinner animation="grow" role="status" variant="secondary" style={{ width: "10rem", height: "10rem" }}>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </div>
  );
}
else{
  return (
    <div className="card-container" style={{ display: "flex" }}>
     <Grid container spacing={5} justifyContent="center">
      <Grid item xs={8}>
      <Link to={`/verification/${application.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: '100%', height: '20%' }} style={{flex:1, backgroundColor: '#FFD580', height: "45vw"}}>
          
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
                  {/* <CardActions>
                    <Link to={`/document/${application.id}`} target={"_blank"} style={{ textDecoration: 'none' }}>View Documents</Link>
                  </CardActions> */}
                  <CardActions>
                    <Button class="btn btn-info btn-lg" onClick = {() => document(`https://8081-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/document/${application.id}`)}>View Documents</Button>
                  </CardActions>
                </CardContent>
                
              </Card>
            </Link>
      </Grid>
      <Grid item xs ={4}>
        <Card sx={{ width: '100%', height: '100%' }} style={{flex:2, backgroundColor: 'lightpurple'}}>
        {/* <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Email: {application.email}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicantion ID: {application.id}
                  </Typography>

                  <Typography sx={{ fontSize: 30 }} gutterBottom>
                    Applicant Aadhar: {application.aadharNumber} 
                  </Typography>
                  <CardMedia
                      component="img"
                      height="140"
                      image="https://images.pexels.com/photos/67636/rose-blue-flower-rose-blooms-67636.jpeg"
                      alt="green iguana"
                  /> */}
                  <CardMedia
                      component="img"
                      height="550"
                      image={picture}
                      alt="image"
                  />


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