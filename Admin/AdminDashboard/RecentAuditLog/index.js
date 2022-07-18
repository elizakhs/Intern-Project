import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function RecentAuditLog() {
  const [RecentAuditLog, setRecentAuditLog] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/recentauditlog/history")
      .then((res) => {
        if (res.status === 200) setRecentAuditLog(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid bg-light g-0" id="recent-1">
      <div className="d-flex flex-column">
        <h2 className="mt-3">Latest Audit Log History</h2>

        <table className="mt-4 mb-4 text-center" id="recent-audit-log">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Category</th>
              <th>Changed Object</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
            {RecentAuditLog.slice(0, 3).map((recentlog, i) => (
              <tr key={i}>
                <td> {recentlog.DateTime} </td>
                <td> {recentlog.Category} </td>
                <td> {recentlog.ChangedObject} </td>
                <td> {recentlog.User} </td>
              </tr>
            ))}
          </tbody>
          
        </table>
      </div>
    </div>
  );
}

export default RecentAuditLog;
