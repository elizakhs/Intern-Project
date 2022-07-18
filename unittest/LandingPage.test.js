import React from "react";
import ReactDOM from "react-dom";
import ListOfReleaseNotes from "../components/ReleaseNotes/LandingPage/LandingPage";
//import ListOfReleaseNotesTest from "../../../App";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ListOfReleaseNotes />, div);
  ReactDOM.unmountComponentAtNode(div);
});
