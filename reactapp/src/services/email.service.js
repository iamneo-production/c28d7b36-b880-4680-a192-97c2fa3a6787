import axios from "axios";
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";
import { v4 as uuid } from 'uuid';

class EmailService{
    sendAcceptedMail(recipient, firstName, lastName, id){
        const uniqueID = uuid().slice(0,8);
        const msgBody = "Respected " + firstName + " " + lastName + ", \nThis mail is to confirm that your Driving License Application with ID " + id + " has been accepted.\nDriving License ID is " + uniqueID + ".";
        const subject = "Driving License Application Accepted";
        const mailData = {recipient, msgBody, subject};
        console.log(mailData);
        try {
            let res = axios.post(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/email/sendMail`, mailData, { headers: authHeader() });
            return res;
        } catch(error){
            console.log(error.response);
        }
    }

    sendRejectedMail(recipient, firstName, lastName, id){
        const msgBody = "Respected " + firstName + " " + lastName + ", \nThis mail is to inform you that your Driving License Application with ID " + id + " has been rejected.";
        const subject = "Driving License Application Rejected";
        const mailData = {recipient, msgBody, subject};
        console.log(mailData);
        try {
            let res = axios.post(`https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/email/sendMail`, mailData, { headers: authHeader() });
            return res;
        } catch(error){
            console.log(error.response);
        }
    }
}

export default new EmailService();