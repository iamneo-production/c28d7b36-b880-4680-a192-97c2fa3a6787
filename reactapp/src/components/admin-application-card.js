import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from "react-router-dom";
import { CardActionArea } from '@mui/material';
import Spinner from 'react-bootstrap/Spinner';


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

  if(!application.id){
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
    <div className="card-container" style={{ padding: 15 }}>
      <Grid container spacing={10} justifyContent="center">
      <Grid item xs={12}>
      <Link to={`/verification/${application.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ minWidth: 275 }} style={{flex:1, backgroundColor:'lightgray'}}>
          <CardActionArea>
                <CardContent>
                  <Typography sx={{ fontSize: 17 }} gutterBottom>
                    Applicant Name: {application.firstName} {application.lastName} &emsp; &emsp;Applicant Phone No: {application.phoneNumber1}
                    
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
  }
};

export default AdminApplicationCard;