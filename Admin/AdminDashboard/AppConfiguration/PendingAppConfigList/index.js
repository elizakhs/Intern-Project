import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style.css";
import "../../../../Buttons/Buttons.css";

function PendingAppConfigList() {
  const [unconfiguredApps, setUnconfiguredApps] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/configuredapps/1")
      .then((res) => {
        if (res.status === 200) setUnconfiguredApps(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid mt-2 g-0">
      <div id="PendingAppConfigList" className="d-flex flex-fill flex-column">
        <h2 className="heading-app mt-2">
          Pending Configuration <br />
          Application
        </h2>
        <div>
          <table id="pending-app" className="mt-2 mb-2 text-center">
            <thead>
              <tr>
                <th>Application</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
              
            </thead>
            <tbody>
              {unconfiguredApps.slice(0, 3).map((unconfigured, i) => (
                <tr key={i}>
                  <td>{unconfigured.Application}</td>
                  <td>{unconfigured.Description}</td>
                  <td>
                    <button className="button-blue-small">Configure</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PendingAppConfigList;
