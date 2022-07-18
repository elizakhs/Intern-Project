import React from "react";
import "./HorizontalBar.css";
import "../../Buttons/Buttons.css";

function HorizontalBar() {
  return (
    <div className="container-fluid g-0" id="midnav">
      <div className="container-nav">
        <div className="row">
          <div className="col">
            <div className="nav-1">
              <button className="button-white-big">Release Notes</button>
            </div>
          </div>
          <div className="col">
            <div className="nav-1">
              <button className="button-white-big">Documentation</button>
            </div>
          </div>
          <div className="col">
            <div className="nav-1">
              <button className="button-white-big">FAQ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HorizontalBar;
