import React from "react";
import "./style.css";
import Button from "../../../../../Buttons/Buttons";

export const AddNewRole = (props) => {
  const button = [
    {
      type: "button-blue-small",
      text: "Submit",
    },
    {
      type: "button-red",
      text: "Cancel",
    },
  ];

  return (
    <div class="container-addrole">
      <p className="title-addrole">Add New Role</p>
      <br />
      <label className="float-left" for="name">
        Role Name
      </label>
      <textarea
        className="textarea-name-del"
        name="role-name"
        placeholder="Role Name..."
      ></textarea>
      <label className="float-left" for="description">
        Description
      </label>
      <textarea
        className="textarea-description-add"
        name="description"
        placeholder="Enter a description."
      ></textarea>
      <br />
      <br />
      <div className="float-center">
        <Button button={button[0]}></Button>
        <Button button={button[1]}></Button>
      </div>
    </div>
  );
};
