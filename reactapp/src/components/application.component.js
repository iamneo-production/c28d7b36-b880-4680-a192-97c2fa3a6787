import React, { Component } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/Grid';
import {withRouter} from "../withRouter"
import ApplicationService from "../services/application.service"
import AuthService from "../services/auth.service"

class Application extends Component {
    constructor(props){
        super(props);
        this.state={
            id: '',
        }
    }

    componentDidMount() {
        ApplicationService.getUserId().then((res) => {
            this.setState({
              id: res.data,
            });
          })
          .catch(() => {
            AuthService.logout();
          });
      }

    render() {
        // const { user: currentUser } = this.props;

        // if (!currentUser) {
        //     console.log("no");
        //     console.log(this.props);
        // }
        // else{
        //     console.log("si");
        // }
        
        //const history = this.props.history;
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    gender: '',
                    fatherName: '',
                    phoneNumber1:'',
                    phoneNumber2: '',
                    aadharNumber: '',
                    status: 'IN PROGRESS',
                    houseNo: '',
                    streetName: '',
                    areaName: '',
                    city: '',
                    state: '',
                    pincode: ''

                    //user:''
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('First Name is required'),
                    lastName: Yup.string()
                        .required('Last Name is required'),
                    email: Yup.string()
                        .email('Email is invalid')
                        .required('Email is required'),
                    gender: Yup.string()
                        .required('Gender is required'),
                    fatherName: Yup.string()
                        .required('Father Name is required'),
                    phoneNumber1: Yup.string()
                        .required('Phone Number Name is required')
                        .matches(/^[0-9]+$/, "Must be only digits")
                        .min(10, 'Must be exactly 10 digits')
                        .max(10, 'Must be exactly 10 digits'),
                    phoneNumber2: Yup.string()
                        .required('Alternate Number Name is required')
                        .matches(/^[0-9]+$/, "Must be only digits")
                        .min(10, 'Must be exactly 10 digits')
                        .max(10, 'Must be exactly 10 digits'),
                    aadharNumber: Yup.string()
                        .required('Aadhar Number is required')
                        .matches(/^[0-9]+$/, "Must be only digits")
                        .min(12, 'Must be exactly 12 digits')
                        .max(12, 'Must be exactly 12 digits'),
                    houseNo: Yup.string()
                        .required('House No. is required')
                        .matches(/^[0-9]+$/, "Must be only digits"),
                    streetName: Yup.string()
                        .required('Street Name is required'),
                    areaName: Yup.string()
                        .required('Area Name is required'),
                    city: Yup.string()
                        .required('City is required'),
                    state: Yup.string()
                        .required('State is required'),
                    pincode: Yup.string()
                        .required('Pincode is required')
                        .matches(/^[0-9]+$/, "Must be only digits"),
                    
                })}
                //validator={() => ({})}
                onSubmit={fields => {
                        // const res = ApplicationService.getUserId();
                        // console.log(res);
                        //this.setState({ user:{ id:'abc'} });
                        //fields.setState({ user:'res.data' });
                        //console.log('SUCCESS!! :-)\n\n' + JSON.stringify({...fields, status:'IN PROGRESS', user:{id:res.data}}, null, 4))
                        const [firstName, lastName, email, gender, fatherName, phoneNumber1, phoneNumber2, aadharNumber] = [fields.firstName, fields.lastName, fields.email, fields.gender, fields.fatherName, fields.phoneNumber1, fields.phoneNumber2, fields.aadharNumber];
                        //console.log(firstName);
                        //const firstName = fields.firstName;
                        
                        //console.log(fields.firstName);
                        //console.log(email);
                        const appData = {firstName, lastName, email, gender, fatherName, phoneNumber1, phoneNumber2, aadharNumber, status:'IN PROGRESS', user:{id:this.state.id}};
                        
                        //console.log(appData);
                         const result = ApplicationService.apply(appData);
                         const [houseNo, streetName, areaName, city, state, pincode] = [fields.houseNo, fields.streetName, fields.areaName, fields.city, fields.state, fields.pincode];
                         var addrData;
                         const getAddr = async () => {
                            const a = await result;
                            localStorage.setItem("application", JSON.stringify(a.data));
                            //console.log(a.data);
                            addrData = {houseNo, streetName, areaName, city, state, pincode, type: 1,application:{id:a.data}};
                            //console.log(addrData);
                            const addrResult = await ApplicationService.addrApply(addrData);
                            //return(a.data);
                          };
                        getAddr();
                        //console.log(appId);
                        //console.log(addrData)
                    
                    //console.log("yes");
                    this.props.navigate("/upload");
                    //history.push("/upload");
                    //window.location.replace('/upload'); 
                    // navigate('/upload');
                    //console.log('SUCCESS!! :-)\n\n' + JSON.stringify({...fields, user:{id:'2'}}, null, 4))
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="firstName">First Name</label>
                                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid  item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="lastName">Last Name</label>
                                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid  item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <Field name="gender" type="text" className={'form-control' + (errors.gender && touched.gender ? ' is-invalid' : '')} />
                                    <ErrorMessage name="gender" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="fatherName">Father's Name</label>
                                    <Field name="fatherName" type="text" className={'form-control' + (errors.fatherName && touched.fatherName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="fatherName" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber1">Phone Number</label>
                                    <Field name="phoneNumber1" type="text" className={'form-control' + (errors.phoneNumber1 && touched.phoneNumber1 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="phoneNumber1" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="phoneNumber2">Alternate Number</label>
                                    <Field name="phoneNumber2" type="text" className={'form-control' + (errors.phoneNumber2 && touched.phoneNumber2 ? ' is-invalid' : '')} />
                                    <ErrorMessage name="phoneNumber2" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="aadharNumber">Aadhar Number</label>
                                    <Field name="aadharNumber" type="text" className={'form-control' + (errors.aadharNumber && touched.aadharNumber ? ' is-invalid' : '')} />
                                    <ErrorMessage name="aadharNumber" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <h2> Address</h2>
                            <br/>
                            <Grid item xs={10}>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="houseNo">House No.</label>
                                    <Field name="houseNo" type="text" className={'form-control' + (errors.houseNo && touched.houseNo ? ' is-invalid' : '')} />
                                    <ErrorMessage name="houseNo" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="streetName">Street Name</label>
                                    <Field name="streetName" type="text" className={'form-control' + (errors.streetName && touched.streetName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="streetName" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="areaName">Area Name</label>
                                    <Field name="areaName" type="text" className={'form-control' + (errors.areaName && touched.areaName ? ' is-invalid' : '')} />
                                    <ErrorMessage name="areaName" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="city">City</label>
                                    <Field name="city" type="text" className={'form-control' + (errors.city && touched.city ? ' is-invalid' : '')} />
                                    <ErrorMessage name="city" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <Field name="state" type="text" className={'form-control' + (errors.state && touched.state ? ' is-invalid' : '')} />
                                    <ErrorMessage name="state" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                <div className="form-group">
                                    <label htmlFor="pincode">PINCODE</label>
                                    <Field name="pincode" type="text" className={'form-control' + (errors.pincode && touched.pincode ? ' is-invalid' : '')} />
                                    <ErrorMessage name="pincode" component="div" className="invalid-feedback" />
                                </div>
                                </Item>
                            </Grid>
                        
                            <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2">Apply</button>
                            <button type="reset" className="btn btn-secondary">Reset</button>
                        </div>
                    </Grid>
                    </Form>
                )}
            />
        )
    }
}

export default withRouter(Application)
