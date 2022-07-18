import React from "react";
import ReactDOM from "react-dom";
import AuditLogHistory from "../components/Admin/AdminDashboard/AuditLogHistory/index";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AuditLogHistory />, div);
  ReactDOM.unmountComponentAtNode(div);
});
