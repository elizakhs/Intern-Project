import React, { useState } from "react";
import "../style.css";
import axios from "axios";

export default function DeleteFraud(props) {
  const [fraudDelete, setFraudDelete] = useState(props);

  const handleDelete = (ID) => {
    axios
      .delete("http://localhost:8080/fraudmanagement/del", {
        data: {
          id: ID,
        },
      })
      .then((res) => {
        if (res.status === 200) setFraudDelete(res.data[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div class="container-deletefraud">
      <label className="title-deletefraud">Delete Term</label>
      <br />
      <br />
      <h5 className="float-center-text">Confirm to delete?</h5>
      <br />
      <br />
      <div className="float-center">
        <button className="button-blue-small" onClick={() => handleDelete(2)}>
          Confirm
        </button>
        <button className="button-red">Cancel</button>
      </div>
    </div>
  );
}
