import React from "react";
import "./style.css";
import Button from "../../Buttons/Buttons";

export const AddNewTerm = (props) => {
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
    <div className="container-addterm">
      <p className="title-addterm">Add New Term</p>

      <label className="float-left" htmlFor="name">
        <strong>Term</strong>
      </label>
      <textarea
        className="textarea-name-del"
        name="term-name"
        placeholder="Term Name..."
      ></textarea>

      <br />
      <div className="float-center">
        <Button button={button[0]}></Button>
        <Button button={button[1]}></Button>
      </div>
    </div>
  );
};
