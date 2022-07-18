import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

import "./ApplicationSettingsList.css";
import EditButton from "./EditButton/EditButton";
export const SettingsContext = createContext();
function ApplicationSettingsList() {
  const [appSettingsList, setAppSettingsList] = useState([]);

  const handleSetAppSettingsList = (data) => {
    setAppSettingsList(data);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appattributes/listappattributes")
      .then((res) => {
        if (res.status === 200) handleSetAppSettingsList(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        handleSetAppSettingsList,
        appSettingsList,
      }}
    >
      <div className="container-fluid" id="app-settings">
        <div className="row">
          <div className="col-lg-12 col-md-6 col-sm-3">
            <div className="row">
              <h1 id="title" className="text-start">
                Applications Settings
              </h1>
            </div>
            <div className="row ">
              <div className="">
                <button className="button-blue">Add New</button>
              </div>
            </div>
            <div className="row">
              <table id="appSettings">
                <thead>
                  <th>Application ID</th>
                  <th>
                    Application Name
                    <button className="filter-app-settings">
                      <img
                        src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                        alt="filter"
                      />
                    </button>
                  </th>
                  <th>Background Color</th>
                  <th>Font Size</th>
                  <th>Font Family</th>
                  <th>Theme</th>
                  <th>Navigation Bar</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {appSettingsList.map((appSettings, i) => (
                    <EditButton key={i} appSettings={appSettings} i={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SettingsContext.Provider>
  );
}

export default ApplicationSettingsList;
