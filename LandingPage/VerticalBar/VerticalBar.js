import React from "react";
import "./VerticalBar.css";

function VerticalBar() {
  return (
    <div className="container-fluid g-0">
      <div className="sidenav">
        <div className="d-flex justify-content-center">
          <img
            src={process.env.PUBLIC_URL + "/images/helpx.png"}
            alt="helpxlogo"
          />
        </div>
      </div>
    </div>
  );
}

export default VerticalBar;
