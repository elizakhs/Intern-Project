import React, { useState } from "react";
import FAQEditCC from ".";
import "./style.css";

export const EditFAQButton = ({ fql, i }) => {
  //active component
  const [showEditFAQCC, setShowEditFAQCC] = useState(false);
  const [showDeleteFAQCC, setShowDeleteFAQCC] = useState(false);

  return (
    <tr key={i}>
      <td>{fql.ID}</td>
      <td>{fql.Name}</td>
      <td>{fql.Question}</td>
      <td>{fql.Answer}</td>
      <td>{fql.QuestionOrder}</td>
      <td>{fql.IsVisible}</td>
      <td>
        <button className="button-white">Publish</button>
        <button
          className="button-green"
          onClick={() => setShowEditFAQCC(!showEditFAQCC)}
        >
          Edit
        </button>
        <button className="button-red">Delete</button>
      </td>
      <td>
        {showEditFAQCC ? (
          <FAQEditCC
            fql={fql}
            changeState={(showEditFAQCC) => setShowEditFAQCC(showEditFAQCC)}
          />
        ) : null}
      </td>
    </tr>
  );
};
