import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";
import DeleteButton from "./UserManagementBtn/DeleteUser/DeleteButton";
import AddNewUser from "./UserManagementBtn/AddNewUser";

function UserManagement() {
  const [UserManagement, setUserManagement] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/sel")
      .then((res) => {
        if (res.status === 200) setUserManagement(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid" id="user-mana">
      <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-3">
          <div className="row">
            <h1 className="text-start">User Management</h1>
          </div>
          <div className="row ">
            <div className="">
              <button
                className="button-blue"
                onClick={() => setShowAdd(!showAdd)}
              >
                Add New
              </button>
            </div>
          </div>
          <div>{showAdd ? <AddNewUser /> : null}</div>

          <div className="row">
            <table>
              <thead>
                <th>
                  <div className="img-expandMore">
                    User ID
                    <img
                      className="dropdown"
                      src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                      alt="dropdown for user id"
                    />
                  </div>
                </th>
                <th>
                  User Name{" "}
                  <img
                    className="dropdown"
                    src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                    alt="dropdown for user name"
                  />
                </th>
                <th>
                  User Email{" "}
                  <img
                    className="dropdown"
                    src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                    alt="dropdown for user email"
                  />
                </th>
                <th>
                  Application{" "}
                  <img
                    className="dropdown"
                    src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                    alt="dropdown for application"
                  />
                </th>
                <th> Content Contributor </th>
                <th> Content Approver </th>
                <th> System Admin </th>
                <th> Action </th>
                <th></th>
              </thead>
              <tbody>
                {UserManagement.map((userDelete, i) => (
                  <DeleteButton userDelete={userDelete} i={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
