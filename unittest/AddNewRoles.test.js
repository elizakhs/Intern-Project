import React from "react";
import ReactDOM from "react-dom";
import AddNewRole from "../components/Admin/AdminManagement/RolesManagement/RolesManagementBtn/AddNewRole";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<AddNewRole />, div);
  ReactDOM.unmountComponentAtNode(div);
});
