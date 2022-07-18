import React from "react";
import ReactDOM from "react-dom";
import BookmarkList from "../components/Bookmark/BookmarkListEU/index";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BookmarkList />, div);
  ReactDOM.unmountComponentAtNode(div);
});
