import React from "react";
import "../style.css";

export default function DeleteApplicationList({ appList, ...props }) {
  return (
    <div className="container-lg" id="deleteapp">
      <div className="row">
        <div className="row mb-5 ps-5 mt-5">
          <h1 className="text-center fs-5">Delete Application</h1>
        </div>
        <div className="row-9 mb-5">
          <form>
            <label className="float-start">Application Name</label>
            <input type="text" placeholder={appList.name} disabled />
            <label className="float-start">Application Name</label>
            <input type="text" placeholder={appList.url} disabled />
          </form>
        </div>

        <div className="row float-center">
          <h1 className="text-center fs-6 ">Confirm Delete?</h1>
        </div>
        <div className="row mb-5">
          <div className="col">
            <button className="button-blue-small">Confirm</button>
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
