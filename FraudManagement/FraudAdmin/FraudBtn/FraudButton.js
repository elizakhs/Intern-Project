import React, { useState, Component } from "react";
import DeleteFraud from "./DeleteFraud/DeleteFraud";
import { EditFraud } from "./EditFraud/EditFraud";

const FraudButton = ({ fraudButton, i }) => {
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  return (
    <tr key={i}>
      <td> {fraudButton.id} </td>
      <td> {fraudButton.term}</td>
      <td className="action-column">
        <button className="button-green" onClick={() => setShowEdit(!showEdit)}>
          Edit
        </button>
        <button
          className="button-red"
          onClick={() => setShowDelete(!showDelete)}
        >
          Delete
        </button>
      </td>
      <td>
        {showEdit ? <EditFraud /> : null}
        {showDelete ? <DeleteFraud /> : null}
      </td>
    </tr>
  );
};

export default FraudButton;
