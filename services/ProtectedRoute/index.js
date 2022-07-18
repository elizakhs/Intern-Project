import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const url = Object.values({ ...rest.location.pathname }).join("");
  const tokenEmail = localStorage.getItem("user_email");
  const isAuthenticated = localStorage.getItem("id_token");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/sel")
      .then((res) => {
        if (res.status === 200) setUsers(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const getRole = () => {
    let role = "";
    users.map((user) => {
      if (user.Email === tokenEmail) role = user.Name;
    });
    return role;
  };

  const getUserId = () => {
    let userid;
    users.map((user) => {
      if(user.Email === tokenEmail) {
        userid = user.id;
      }
    });
    return userid;
  };

  const getAppId = () => {
    let appid;
    users.map((user) => {
      if(user.Email === tokenEmail) {
        appid = user.appid;
      }
    });
    return appid;
  }
  const userRole = getRole();
  const userid = getUserId();
  const appid = getAppId();

  const checkAdmin = () => {
    return (
      userRole !== "End User" &&
      userRole !== "Content Contributor" &&
      userRole !== "Content Approver"
    );
  };

  localStorage.setItem("isAdmin", checkAdmin() ? "true" : "false");
  localStorage.setItem("userid", userid);
  localStorage.setItem("appid", appid);

  console.log(userRole);

  //check whether id token is generated or not
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  } else if (url.indexOf("/creator") > -1) {
    if (
      userRole !== "End User" &&
      userRole !== "Content Approver" &&
      userRole !== "System Admin"
    ) {
      return <Route {...rest} />;
    } else {
      return <Redirect push to="/homepage" />;
    }
  } else if (url.indexOf("/approver") > -1) {
    if (
      userRole !== "End User" &&
      userRole !== "System Admin" &&
      userRole !== "Content Contributor"
    ) {
      return <Route {...rest} />;
    } else {
      return <Redirect push to="/homepage" />;
    }
  } else if (url.indexOf("/admin") > -1) {
    if (
      userRole !== "End User" &&
      userRole !== "Content Approver" &&
      userRole !== "Content Contributor"
    ) {
      return <Route {...rest} />;
    } else {
      return <Redirect push to="/homepage" />;
    }
  } else if (url.indexOf("/editor") > -1) {
    if (userRole !== "End User" && userRole !== "System Admin") {
      return <Route {...rest} />;
    } else {
      return <Redirect push to="/homepage" />;
    }
  } else if (url.indexOf("/content") > -1) {
    if (userRole === "System Admin") {
      return <Redirect to="/admin/home" />;
    } else {
      return <Route {...rest} />;
    }
  } else if (url.indexOf("/homepage") > -1) {
    if (
      userRole !== "End User" &&
      userRole !== "Content Contributor" &&
      userRole !== "Content Approver"
    ) {
      return <Redirect push to="/admin/home" />;
    } else {
      return <Route {...rest} />;
    }
  } else {
    return <Route {...rest} />;
  }
};

export default ProtectedRoute;
