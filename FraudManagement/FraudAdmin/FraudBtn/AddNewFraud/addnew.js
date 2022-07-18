import React from "react";
import "../style.css";
import Button from "../../../../Buttons/Buttons";

export default function AddNewFraud() {
  const button = [
    {
      type: "button-blue-small",
      text: "Create",
    },
    {
      type: "button-red",
      text: "Cancel",
    },
  ];

  return (
    <div class="container-addfraud">
      <p className="title-addfraud">Add New</p>
      <br />
      <label className="float-left" for="term">
        Term
      </label>
      <textarea
        className="textarea-name-del"
        name="term"
        placeholder="Enter a term..."
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
