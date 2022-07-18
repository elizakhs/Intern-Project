import React from "react";
import ReactDOM from "react-dom";
import FeedbackListCCRN from "../components/Feedback/FeedbackListCCRN/index";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FeedbackListCCRN/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
