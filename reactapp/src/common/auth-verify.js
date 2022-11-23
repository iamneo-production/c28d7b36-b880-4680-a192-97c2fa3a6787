import React, { useEffect } from "react";
import { comRouter } from "./common-router";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = props.router.location;

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);
      // console.log(Date.now());
      // console.log(decodedJwt.exp*1000);
      if (decodedJwt.exp * 1000 < Date.now()) {
        console.log("true");
        props.logOut();
      }
    }
  }, [location]);

  return <div></div>;
};

export default comRouter(AuthVerify);

// import React, { Component } from "react";
// import { history } from '../helpers/history';

// const parseJwt = (token) => {
//   try {
//     return JSON.parse(atob(token.split('.')[1]));
//   } catch (e) {
//     return null;
//   }
// };

// class AuthVerify extends Component {
//   constructor(props) {
//     super(props);

//     history.listen(() => {
//       const user = JSON.parse(localStorage.getItem("user"));

//       if (user) {
//         const decodedJwt = parseJwt(user.accessToken);

//         if (decodedJwt.exp * 1000 < Date.now()) {
//           props.logOut();
//         }
//       }
//     });
//   }

//   render() {
//     return <div></div>;
//   }
// }

// export default AuthVerify;