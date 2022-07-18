import React from "react";
import ReactDOM from "react-dom";
import IntegratedApplication from "../components/Admin/AdminDashboard/Dashboard/IntegratedApplication";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<IntegratedApplication />, div);
  ReactDOM.unmountComponentAtNode(div);
});