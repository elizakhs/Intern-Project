import React from "react";
import ReactDOM from "react-dom";
import WordFilterNew from "../components/FraudManagement/WordFilterNew";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WordFilterNew />, div);
  ReactDOM.unmountComponentAtNode(div);
});