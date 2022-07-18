import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import RolesButton from "./RolesManagementBtn/RolesButton";
import { AddNewRole } from "./RolesManagementBtn/AddNewRole";

function RolesManagement() {
  const [RolesManagement, setRolesManagement] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/userroles/sel")
      .then((res) => {
        if (res.status === 200) setRolesManagement(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid" id="role-mana">
      <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-4">
          <div className="row">
            <h1 className="text-start">Roles Management</h1>
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

          <div>{showAdd ? <AddNewRole /> : null}</div>

          <div className="row">
            <table>
              <thead>
                <th>
                  Role ID{" "}
                  <img
                    className="dropdown"
                    src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                    alt="dropdown"
                  />
                </th>
                <th>
                  Role Name{" "}
                  <img
                    className="dropdown"
                    src={process.env.PUBLIC_URL + "/images/expandMore.png"}
                    alt="dropdown"
                  />
                </th>
                <th> Description </th>
                <th> Number of Users </th>
                <th> Action </th>
                <th></th>
              </thead>
              <tbody>
                {RolesManagement.map((roleButton, i) => (
                  <RolesButton roleButton={roleButton} i={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RolesManagement;
