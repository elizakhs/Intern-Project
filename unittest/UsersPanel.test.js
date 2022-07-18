import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import UsersPanel from "./UsersPanel";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<UsersPanel />, div);
  ReactDOM.unmountComponentAtNode(div);
});
