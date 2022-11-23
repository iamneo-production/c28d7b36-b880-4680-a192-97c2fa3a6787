import axios from "axios";
import authHeader from "/home/coder/project/workspace/reactapp/src/services/auth-header";

export default axios.create({
  baseURL: "https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/file",
  headers: {
    "Content-type": "application/json", 'Authorization': `${authHeader().Authorization}`
  }
});