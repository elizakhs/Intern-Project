import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersPanel.css";

function UsersPanel() {
  const [listUsersWithoutRoles, setListUsersWithoutRoles] = useState([]);
  const [listNotActiveUsers, setListNotActiveUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users/1")
      .then((res) => {
        if (res.status === 200) setListUsersWithoutRoles(res.data[0]);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/api/users/2")
      .then((res) => {
        if (res.status === 200) setListNotActiveUsers(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid m-1">
      <div id="user-panel" className="d-flex flex-fill flex-column">
        <div className="d-flex flex-column" id="users-without-roles">
          <h2 className="heading-app pb-4">Users without roles</h2>
          {listUsersWithoutRoles.slice(0, 3).map((user, i) => {
            return (
              <div className="row">
                <div key={i}>
                  <div className="col-2" id="green-circle"></div>
                  <span className="col-10" id="user-name">
                    {user.Name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="d-flex flex-column" id="not-active-users">
          <h2 className="heading-app pb-4">Not active user</h2>
          {listNotActiveUsers.slice(0, 3).map((user, i) => {
            return (
              <div className="row">
                <div key={i}>
                  <div className="col-2" id="gray-circle"></div>
                  <span className="col-10" id="user-name">
                    {user.Name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersPanel;
