import React from 'react';
import ReactDOM from "react-dom";
import Dashboard from '../components/ReleaseNotes/Dashboard';

it("render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Dashboard />, div);
    ReactDOM.unmountComponentAtNode(div);
});