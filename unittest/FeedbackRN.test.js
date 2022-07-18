import React from "react";
import ReactDOM from "react-dom";
import FeedbackRN from "../components/Feedback/FeedbackRN";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FeedbackRN />, div);
  ReactDOM.unmountComponentAtNode(div);
});
