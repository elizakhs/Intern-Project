import React, { useState } from "react";
import axios from "axios";

import "../style.css";

export default function EditListOfApp({ appList, ...props }) {
  const [appName, setAppName] = useState([]);
  const [appUrl, setAppUrl] = useState([]);

  return (
    <div className="container-lg" id="editapp">
      <div className="row">
        <div className="row mb-5 ps-5 mt-5">
          <h1 className="text-center fs-5">Edit Application</h1>
        </div>
        <div className="row-9">
          <form>
            <div className="form-group">
              <label className="float-start">Application Name</label>
              <input type="text" placeholder={appList.name} />
              <label className="float-start">Application URL</label>
              <textarea id="textarea-app" placeholder={appList.url}></textarea>
            </div>
          </form>
        </div>
        <div className="row float-center mb-5">
          <div className="col">
            <button className="button-blue-small">Save</button>
          </div>
          <div className="col">
            <button
              className="button-red"
              onClick={() => props.changeState(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
