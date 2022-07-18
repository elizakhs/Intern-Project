import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DataTable.css";
import Button from "../../../Buttons/Buttons";
import Pagination from "../../../Layout/Navigation/Pagination/pagination";
import EditFAQ from "../ActionButtonsFAQTable/EditFAQ/EditFAQ";
import DeleteFAQ from "../ActionButtonsFAQTable/DeleteFAQ/DeleteFAQ";
import AddNewFAQ from "../ActionButtonsFAQTable/AddNewFAQ/AddNewFAQ";

function DataTable() {
  const [FAQAdminList, setFAQAdminList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/faq/sel")
      .then((res) => {
        if (res.status === 200) setFAQAdminList(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const button = [
    {
      type: "button-white",
      text: "Preview",
    },
    {
      type: "button-green",
      text: "Edit",
    },
    {
      type: "button-red",
      text: "Delete",
    },
    {
      type: "button-blue",
      text: "Add New",
    },
  ];
  return (
    <div>
      <div className="faq-list-component">
        <h1 id="faq-title">Frequently Asked Question</h1>
        <button className="button-blue" onClick={() => setShowAdd(!showAdd)}>
          Add New
        </button>
      </div>
      <div>
        <table id="faq">
          <tr>
            <th>
              FAQ ID{" "}
              <img
                className="dropdown"
                src={process.env.PUBLIC_URL + "/images/expandMore.png"}
              />
            </th>
            <th>Application Section</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Visibility</th>
            <th>Feedback Allowed</th>
            <th>Order</th>
            <th>Action</th>
            <th></th>
          </tr>
          {FAQAdminList.map((fq, i) => (
            <tr key={i}>
              <td>{fq.ID}</td>
              <td>{fq.Name}</td>
              <td>{fq.Question}</td>
              <td>{fq.Answer}</td>
              <td>{`${fq.IsVisible ? "Yes" : "No"}`}</td>
              <td>{`${fq.IsFeedbackAllowed ? "Yes" : "No"}`}</td>
              <td>{fq.QuestionOrder}</td>
              <td className="action-column">
                <button className="button-white">Preview</button>
                <button
                  className="button-green"
                  onClick={() => setShowEdit(!showEdit)}
                >
                  Edit
                </button>
                <button
                  className="button-red"
                  onClick={() => setShowDel(!showDel)}
                >
                  Delete
                </button>
              </td>
              <td>
                {showEdit ? (
                  <div>
                    <EditFAQ
                      fq={fq}
                      changeState={(showEdit) => setShowEdit(showEdit)}
                    />
                  </div>
                ) : null}{" "}
              </td>
              <td>
                {showDel ? (
                  <div>
                    <DeleteFAQ
                      fq={fq}
                      changeState={(showDel) => setShowDel(showDel)}
                    />
                  </div>
                ) : null}{" "}
              </td>
              <td>
                {showAdd ? (
                  <div>
                    <AddNewFAQ
                      fq={fq}
                      changeState={(showAdd) => setShowAdd(showAdd)}
                    />
                  </div>
                ) : null}{" "}
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default DataTable;
