import React, { useState, useEffect } from "react";
import axios from "axios";
import CounterWidget from "./CounterWidget";
import "./style.css";

function Dashboard() {
  const [countApp, setCountApp] = useState([]);
  const [countUser, setCountUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/countUser/sel")
      .then((res) => {
        if (res.status === 200) setCountUser(res.data[0]);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/integratedapps/sel")
      .then((res) => {
        if (res.status === 200) setCountApp(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const arrayTitle = [
    { title: "Active Users" },
    { title: "Number of Integrated Application" },
  ];

  return (
    <div className="container-fluid" id="dashboard-counter">
      <div className="d-flex flex-fill p-3 d-sm-flex-row ">
        <CounterWidget
          title={arrayTitle[0].title}
          count={countUser.map((user) => user.ActiveUser)}
        />
      </div>
      <div className="d-flex flex-fill p-3 d-sm-flex-row ">
        <CounterWidget
          title={arrayTitle[1].title}
          count={countApp.map((app) => app.IntegratedApp)}
        />
      </div>
    </div>
  );
}

export default Dashboard;
