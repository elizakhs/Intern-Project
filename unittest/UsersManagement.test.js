import React from "react";
import ReactDOM from "react-dom";
import UserManagement from "../components/Admin/AdminManagement/UserManagement";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UserManagement />, div);
  ReactDOM.unmountComponentAtNode(div);
});
