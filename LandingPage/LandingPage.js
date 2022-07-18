import React, { Component } from "react";
import "./LandingPage.css";
import Header from "./Header/Header";
import VerticalBar from "./VerticalBar/VerticalBar";
import HorizontalBar from "./HorizontalBar/HorizontalBar";
import Menu from "./Menu/Menu";

class LandingPage extends Component {

  componentDidMount() {
    if(localStorage.getItem("access_token") && localStorage.getItem("id_token") && 
      localStorage.getItem("expires_at") && localStorage.getItem("user_email") &&
      localStorage.getItem("isAdmin") && localStorage.getItem("userid") &&
      localStorage.getItem("appid")) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("user_email");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("userid");
        localStorage.removeItem("appid");
     }
  }

  render() {
    return (
      <div className="container-fluid" id="landing-page">
        <div className="row p-0">
          <div className="col p-0 d-none d-sm-block">
            <div>
              <VerticalBar />
            </div>
          </div>
          <div className="col-lg-10 col-sm-1 p-0 g-0">
            <div className="row">
              <div className="header">
                <Header />
              </div>
              <div className="navhor d-none d-sm-block">
                <HorizontalBar />
              </div>
              <div className="body d-none d-sm-block">
                <Menu />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
