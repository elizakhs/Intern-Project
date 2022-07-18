import React, { useState } from "react";
import { AddNewRole } from "./AddNewRole";
import { DeleteRole } from "./DeleteRole";
import { EditRole } from "./EditRole";

const RolesButton = ({ roleButton, i }) => {
  const [showRoleAdd, setRoleAdd] = useState(false);
  const [showRoleEdit, setRoleEdit] = useState(false);
  const [showRoleDelete, setRoleDelete] = useState(false);

  return (
    <tr key={i}>
      <td>{roleButton.ID} </td>
      <td> {roleButton.Name} </td>
      <td> {roleButton.Description} </td>
      <td> {roleButton.Number} </td>
      <td>
        <button
          className="button-green"
          onClick={() => setRoleEdit(!showRoleEdit)}
        >
          Edit
        </button>
        <button
          className="button-red"
          onClick={() => setRoleDelete(!showRoleDelete)}
        >
          Delete
        </button>
      </td>
      <td>
        {showRoleAdd ? (
          <div>
            <AddNewRole />
          </div>
        ) : null}
        {showRoleEdit ? (
          <div>
            <EditRole />
          </div>
        ) : null}
        {showRoleDelete ? (
          <div>
            <DeleteRole />
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default RolesButton;
