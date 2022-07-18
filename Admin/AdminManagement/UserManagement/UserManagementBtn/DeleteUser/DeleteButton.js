import React, { useState } from "react";
import DeleteUser from ".";

const DeleteButton = ({ userDelete, i }) => {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <tr key={i}>
      <td> {userDelete.id} </td>
      <td> {userDelete.FirstName}</td>
      <td> {userDelete.Email} </td>
      <td> {userDelete.Name} </td>
      <td>
        <img
          className="checkbox"
          src={process.env.PUBLIC_URL + "/images/checkboxBlank.png"}
          alt="1st checkbox"
        />
      </td>
      <td>
        <img
          className="checkbox"
          src={process.env.PUBLIC_URL + "/images/checkboxBlank.png"}
          alt="2nd checkbox"
        />
      </td>
      <td>
        <img
          className="checkbox"
          src={process.env.PUBLIC_URL + "/images/checkboxBlank.png"}
          alt="3rd checkbox"
        />
      </td>
      <td className="action-column">
        <button
          className="button-red"
          onClick={() => setShowDelete(!showDelete)}
        >
          Delete
        </button>
      </td>
      <td> {showDelete ? <DeleteUser /> : null} </td>
    </tr>
  );
};

export default DeleteButton;
