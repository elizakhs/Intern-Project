import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ApplicationList.css";
import ApplicationListData from "./ApplicationListData/ApplicationListData";

function ApplicationList() {
  const [appList, setAppList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/apps/listapplications")
      .then((res) => {
        if (res.status === 200) setAppList(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid" id="app-list">
      <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-3">
          <div className="row">
            <h1 className="text-start">List of Application</h1>
          </div>
          <div className="row">
            <div className="button-float-right">
              <button className="button-blue">Add New</button>
            </div>
          </div>
          <div className="row">
            <table id="applist">
              <thead>
                <th>
                  Application ID
                  <button className="filter-app-settings">
                    <img
                      src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                      alt="filter"
                    />
                  </button>
                </th>
                <th>
                  Application Name
                  <button className="filter-app-settings">
                    <img
                      src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                      alt="filter"
                    />
                  </button>
                </th>
                <th>Application URL</th>
                <th>Action</th>
              </thead>
              <tbody>
                {appList.map((app, i) => (
                  <ApplicationListData appList={app} i={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApplicationList;
