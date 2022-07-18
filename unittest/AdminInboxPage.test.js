import React from "react";
import ReactDOM from "react-dom";
import AdminInboxPage from "../components/Admin/AdminInboxPage";

it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AdminInboxPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});