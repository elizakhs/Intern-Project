import React from "react";
import ReactDOM from "react-dom";
import FAQListCC from "../components/FAQ/FAQListCC";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FAQListCC />, div);
  ReactDOM.unmountComponentAtNode(div);
});
