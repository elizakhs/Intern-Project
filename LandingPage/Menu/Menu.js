import React from "react";
import "./Menu.css";
import "../../Buttons/Buttons.css";

function Menu() {
  return (
    <div className="container-fluid g-0">
      <div className="content">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="content-1">
                <img
                  className="images-1"
                  src={process.env.PUBLIC_URL + "/images/doc.png"}
                  alt="release-notes"
                />
                <button className="button-green-big">Release Notes</button>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="content-2">
                <img
                  className="images-1"
                  src={process.env.PUBLIC_URL + "/images/note.png"}
                  alt="documentation"
                />
                <button className="button-green-big">Documentation</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
