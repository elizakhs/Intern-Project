import React from "react";
import ReactDOM from "react-dom";
import WordFilterList from "../components/FraudManagement/WordFilterList/index.js";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<WordFilterList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
