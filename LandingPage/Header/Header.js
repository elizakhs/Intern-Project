import React, { Component } from "react";
import "./Header.css";
import "../../Buttons/Buttons.css";
// import { Link } from "react-router-dom";
import Auth from "../../../services/Auth/Auth";

class Header extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    const { isAuthenticated, login, logout } = this.auth;
    return (
      <div className="container-fluid g-0">
        <div className="canvas">
          <div className="row">
            <div className="col text-start ps-5 pt-3 fs-2 fw-bolder text-white">
              Helpx
            </div>
            <div className="col pt-3 text-end pe-5">
              <button
                className="button-green"
                onClick={isAuthenticated() ? logout : login}
              >
                {isAuthenticated() ? "Log Out" : "Log In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
