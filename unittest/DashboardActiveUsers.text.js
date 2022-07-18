import React from "react";
import ReactDOM from "react-dom";
import ActiveUsers from "../components/Admin/AdminDashboard/Dashboard/ActiveUsers";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ActiveUsers />, div);
  ReactDOM.unmountComponentAtNode(div);
});