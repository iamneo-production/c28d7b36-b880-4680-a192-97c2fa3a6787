export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    if (user && user.accessToken) {
      // For Spring Boot back-end
      //console.log(user.accessToken); 
      return { Authorization: "Bearer " + user.accessToken };
      // for Node.js Express back-end
      //return { "x-access-token": user.accessToken };
    } else {
      console.log("no ax");
      return {};
    }
  }