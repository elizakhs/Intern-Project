import React from "react";
import ReactDOM from "react-dom";
import SearchResult from "../components/Search/RNSearchResult/SearchResult";

it("render without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<SearchResult />, div);
  ReactDOM.unmountComponentAtNode(div);
});
