import "./style.css";
import Button from "../../Buttons/Buttons";
import Pagination from "../../Layout/Navigation/Pagination/pagination";
import React, { useState, useEffect } from "react";
import axios from "axios";

const button = [
  {
    type: "button-red",
    text: "Delete",
  },
];

function AdminInboxPage() {
  const [AdminInboxPages, setAdminInboxPage] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/notifications/sel")
      .then((res) => {
        if (res.status === 200) setAdminInboxPage(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="admin-inbox-page">
        <h1>Notifications</h1>
      </div>
      <div id="inbox">
        <table>
          <tr>
            <th>
              Notification ID
              <img
                className="dropdown"
                src={process.env.PUBLIC_URL + "/images/expandMore.png"}
              />
            </th>
            <th>
              Type of Notification
              <img
                className="dropdown"
                src={process.env.PUBLIC_URL + "/images/expandMore.png"}
              />
            </th>
            <th>
              User Name
              <img
                className="dropdown"
                src={process.env.PUBLIC_URL + "/images/expandMore.png"}
              />
            </th>
            <th>
              Application
              <img
                className="dropdown"
                src={process.env.PUBLIC_URL + "/images/expandMore.png"}
              />
            </th>
            <th>Summary</th>
            <th>Action</th>
          </tr>
          <tbody>
            {AdminInboxPages.map((aip, i) => (
              <tr key={i}>
                <td>{aip.ID}</td>
                <td>{aip.TypeName}</td>
                <td>{aip.UserName}</td>
                <td>{aip.AppName}</td>
                <td>{aip.Body}</td>

                <td>
                  <Button button={button[0]}></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <Pagination />
        </div>
      </div>
    </div>
  );
}

export default AdminInboxPage;
