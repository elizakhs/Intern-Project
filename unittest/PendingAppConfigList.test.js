import React from "react";
import ReactDOM from "react-dom";
import PendingAppConfigList from "../components/Admin/AdminDashboard/AppConfiguration/PendingAppConfigList";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PendingAppConfigList />, div);
  ReactDOM.unmountComponentAtNode(div);
});