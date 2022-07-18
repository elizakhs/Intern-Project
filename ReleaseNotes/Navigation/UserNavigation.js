import React from "react";
import { Link } from "react-router-dom";
import "./UserNavigation.css";

const UserNavigation = () => {
  return (
    <div className="container-fluid m-0 g-0" >
      <div className="row flex-nowrap g-0">
        <div className="d-flex flex-row">
          <div className="col-auto">
            <div className="UserNav sticky-top">
              {/* profile section */}
              <img
                src={process.env.PUBLIC_URL + "/images/profile.png"}
                alt="profile"
                className="profilpic"
              />
              <h2>Shahmy</h2>
              <h3>Petronas Digital</h3>

              <div className="link">
                <ul>
                  {/* dashboard */}
                  <li>
                    <Link to="/creator/dashboard">
                      <img
                        src={process.env.PUBLIC_URL + "/images/dashboard.png"}
                        alt="Dashboard"
                        className="dashboardLogo"
                      />
                      <br />
                      Dashboard
                    </Link>
                  </li>
                  {/* feedback */}
                  <li>
                    <Link to="/content/feedback">
                      <img
                        src={process.env.PUBLIC_URL + "/images/thumbUp.png"}
                        alt="feedback"
                      />
                      <img
                        src={process.env.PUBLIC_URL + "/images/thumbDown.png"}
                        alt="feedback"
                      />
                      <br />
                      Feedback
                    </Link>
                  </li>
                  {/* bookmark */}
                  <li>
                    <Link to="/content/bookmark">
                      <img
                        src={process.env.PUBLIC_URL + "/images/bookmark.png"}
                        alt="bookmark"
                      />
                      <br />
                      Bookmark
                    </Link>
                  </li>
                  {/* contact admin */}
                  <li>
                    <Link to="/content/contact">
                      <img
                        src={
                          process.env.PUBLIC_URL + "/images/contactAdmin.png"}
                          alt="contact admin"
                      />
                      <br />
                      Contact Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavigation;
