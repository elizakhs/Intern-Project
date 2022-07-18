import React from "react";
import ReactDOM from "react-dom";
import FraudRN from "./components/FraudManagement/FraudRN";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FraudRN/>, div);
  ReactDOM.unmountComponentAtNode(div);
});