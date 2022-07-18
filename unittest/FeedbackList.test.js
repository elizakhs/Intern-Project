import React from "react";
import ReactDOM from "react-dom";
import FeedbackList from "../components/Feedback/FeedbackList";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<FeedbackList />, div);
  ReactDOM.unmountComponentAtNode(div);
});