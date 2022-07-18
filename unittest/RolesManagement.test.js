import React from "react";
import ReactDOM from "react-dom";
import RolesManagement from "../components/Admin/AdminManagement/RolesManagement";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RolesManagement />, div);
  ReactDOM.unmountComponentAtNode(div);
});
