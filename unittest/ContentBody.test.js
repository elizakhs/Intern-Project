import React from "react";
import ReactDOM from "react-dom";
import ContentBody from "../components/ReleaseNotes/ContentBody/ContentBody";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ContentBody />, div);
  ReactDOM.unmountComponentAtNode(div);
});
