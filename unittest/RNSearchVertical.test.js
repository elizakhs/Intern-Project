import React from "react";
import ReactDOM from "react-dom";
import RNSearchVertical from "../components/Search/RNSearchVertical/index";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<RNSearchVertical/>, div);
  ReactDOM.unmountComponentAtNode(div);
});