export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(user);
    if (user && user.accessToken) {
      // For Spring Boot back-end
      return { Authorization: "Bearer " + user.accessToken };
    } else {
      //console.log("no ax");
      return {};
    }
  }