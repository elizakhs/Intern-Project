import React from "react";
import "./style.css";
import Button from "../../../../../Buttons/Buttons";

export const DeleteRole = (props) => {
  //const [role, setRole] = useState(props.role); //commented it 1st in case if it will be used

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
    <div class="container-deleterole">
      <p className="title-deleterole">Delete Role</p>
      <br />
      <label className="float-left" for="name">
        Role Name
      </label>
      <textarea
        className="textarea-name-del"
        name="role-name"
        placeholder="Role Name..."
      >
        End User
      </textarea>
      <label className="float-left" for="description">
        Description
      </label>
      <textarea
        className="textarea-description-del"
        name="description"
        placeholder="Enter a description."
      >
        Only consume content
      </textarea>
      <br />
      <br />
      <div className="float-center">
        <Button button={button[0]}></Button>
        <Button button={button[1]}></Button>
      </div>
    </div>
  );
};
