import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div className="container-fluid g-0">
      <div className="row flex-nowrap col-md-1 col-sm-1">
        <div className="admin-nav col-auto col-md-3 col-xl-2 px-sm px-0 g-0">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            {/* Section for profile picture and name */}
            <div className="row " id="profile-name">
              <div className="col-auto m-2">
                <img
                  className="profilePic"
                  alt="profile-img"
                  src={process.env.PUBLIC_URL + "/images/profileAdm.png"}
                />
              </div>
              <div className="col-auto ">
                <h2 className="ms-1 d-none d-sm-inline">Name Here</h2>
              </div>
            </div>
            {/* section for menus in navbar */}
            <div className="links">
              <ul
                className="class=nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                {/* Dashboard navbar */}
                <li className="nav-item m-3">
                  <Link to="/admin/home" className="nav-link align-middle px-0">
                    <img
                      src={process.env.PUBLIC_URL + "/images/dashbd.png"}
                      className="dashboardLogo"
                      alt="dashboard"
                    />
                    <span className="ms-1 d-none d-sm-inline">Dashboard</span>
                    <br />
                  </Link>
                </li>
                {/* bar for Users with sub menu of User and Roles */}
                <li className="nav-item dropdown w-100">
                  <a
                    href="/submenu1"
                    id="navbarDropdown"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    <img
                      className="images-3"
                      alt="user-img"
                      src={process.env.PUBLIC_URL + "/images/users.png"}
                    />
                    <span className="ms-1 d-none d-sm-inline">
                      Users
                      {/* <img
                        src={process.env.PUBLIC_URL + "/images/arrowdown.png"}
                        className="whitedown"
                        alt="arrowdown"
                      /> */}
                    </span>
                  </a>
                  {/* submenus under Users menu */}
                  <ul
                    className="dropdown-menu w-100"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        to="/admin/users-management"
                        className="dropdown-item"
                      >
                        User
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/roles-management"
                        className="dropdown-item"
                      >
                        Roles
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* Menu for auditlog */}
                <li className="nav-item">
                  <Link to="/admin/audit-logs">
                    <img
                      className="images-4"
                      alt="audit-img"
                      src={process.env.PUBLIC_URL + "/images/audit.png"}
                    />
                    <span className="ms-1 d-none d-sm-inline">Audit Log</span>
                    <br />
                  </Link>
                </li>
                {/* section for configuration with submenues of application,settings,faq,fraud */}
                <li className="nav-item dropdown w-100">
                  <a
                    href="/submenu2"
                    id="navbarDropdown"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    role="button"
                    aria-expanded="false"
                  >
                    <img
                      className="images-5"
                      alt="configure-img"
                      src={process.env.PUBLIC_URL + "/images/configure.png"}
                    />
                    <span className="ms-1 d-none d-sm-inline">
                      Configuration
                      {/* <img
                        src={process.env.PUBLIC_URL + "/images/arrowdown.png"}
                        className="whitedown-2"
                        alt="arrowdown"
                      /> */}
                    </span>
                  </a>
                  {/* Submenus for configurations */}
                  <ul
                    className="dropdown-menu w-100"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <Link
                        to="/admin/application-List"
                        className="dropdown-item"
                      >
                        Application
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/app-settings" className="dropdown-item">
                        Setting
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/faq-list" className="dropdown-item">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/fraud-management"
                        className="dropdown-item"
                      >
                        Fraud
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/admin/notification">
                    <img
                      className="images-6"
                      alt="noti-img"
                      src={process.env.PUBLIC_URL + "/images/notification.png"}
                    />
                    <span className="ms-1 d-none d-sm-inline">
                      Notification
                    </span>
                    <br />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
