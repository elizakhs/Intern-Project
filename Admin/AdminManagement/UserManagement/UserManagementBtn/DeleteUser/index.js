import React from "react";
import "./style.css";
import Button from "../../../../../Buttons/Buttons";

export default function DeleteUser() {
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
    <div class="container-deleteuser">
      <p className="title-deleteuser">Delete User</p>
      <br />
      <label className="float-left" for="name">
        User Name
      </label>
      <textarea
        className="textarea-name-del"
        name="user-name"
        placeholder="User Name..."
      ></textarea>
      <label className="float-left" for="userrole">
        User Role
      </label>
      <textarea
        className="textarea-role-del"
        name="userrole"
        placeholder="Enter the user role."
      ></textarea>
      <br />
      <br />
      <div className="float-center">
        <Button button={button[0]}></Button>
        <Button button={button[1]}></Button>
      </div>
    </div>
  );
}
