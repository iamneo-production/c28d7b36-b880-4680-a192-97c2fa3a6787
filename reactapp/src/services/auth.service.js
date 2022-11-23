import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://8080-eaefecbbedccdfdcecbdadebcceedbabdbccfcfb.examlyiopb.examly.io/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        //console.log(response.data);
        if (response.data.accessToken) {
          //console.log(response.data.accessToken);local
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location.reload();
  }

  register(username, email, password, mobileNumber, role) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      mobileNumber,
      role,
    });
  }
}

export default new AuthService();