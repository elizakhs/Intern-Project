import React from "react";
import ReactDOM from "react-dom";
import TemplateEditor from "../components/ReleaseNotes/Editor/TemplateEditor";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TemplateEditor />, div);
  //   ReactDOM.unmountComponentAtNode(div);
});
