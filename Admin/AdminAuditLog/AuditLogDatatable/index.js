import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import "./style.css";
import { Pagination } from "@mui/material";
import { CSVLink } from "react-csv";

export default function AuditLogDatatable() {
  const [AuditLogDatatable, setAuditLogDatatable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auditlogs/datatable")
      .then((res) => {
        if (res.status === 200) setAuditLogDatatable(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(AuditLogDatatable.length / PER_PAGE);
  const FraudDataCC = usePagination(AuditLogDatatable, PER_PAGE);

  const handleChange = (event, page) => {
    setPage(page);
    FraudDataCC.jump(page);
  };

  function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
      const begin = (currentPage - 1) * itemsPerPage;
      const end = begin + itemsPerPage;

      return data.slice(begin, end);
    }

    function jump(page) {
      const pageNumber = Math.max(1, page);
      setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
    }

    return { jump, currentData, currentPage, maxPage };
  }

  //data for export function
  const csvData = [
    ["DateTime", "User", "Category", "Changes", "ChangedObject"],
    ["2021-11-16 12:15:03", "Alif", "UserID", "Remove", "Jenny"],
    ["2021-11-16 12:15:03", "Alif", "FirstName", "Assign", "Siti"],
  ];

  //using sorting
  const checksort = AuditLogDatatable;
  //for sorting
  const [currentCreated, setCurrentCreated] = useState("createdUnsort");
  const [dateClicked, setDateClicked] = useState("");
  const initialState = {
    isCreatedSorted: false,
    isCreatedDesc: false,
  };
  const [state, dispatch] = useReducer(sortReducer, initialState);
  function sortReducer(state, action) {
    if (dateClicked === "user" || dateClicked === "datetime") {
      switch (action.type) {
        case "createdUnsort":
          return {
            isCreatedSorted: true,
            isCreatedDesc: false,
          };
        case "createdAsc":
          return {
            isCreatedSorted: true,
            isCreatedDesc: true,
          };
        case "createdDesc":
          return {
            isCreatedSorted: true,
            isCreatedDesc: false,
          };
        default:
          return {
            isCreatedSorted: state.isCreatedSorted,
            isCreatedDesc: state.isCreatedDesc,
          };
      }
    }
  }
  function dispatchSort(e) {
    let sortData = [...AuditLogDatatable];
    setDateClicked(e.currentTarget.id);
    let targetDate = e.currentTarget.id;
    if (targetDate === "datetime") {
      if (currentCreated === "createdUnsort") {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DateTime.localeCompare(b.DateTime)
        );
      } else if (currentCreated === "createdAsc") {
        setCurrentCreated("createdDesc");
        dispatch({ type: "createdAsc" });
        sortData = sortData.sort((a, b) =>
          b.DateTime.localeCompare(a.DateTime)
        );
      } else {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DateTime.localeCompare(b.DateTime)
        );
      }
    }

    if (targetDate === "user") {
      if (currentCreated === "createdUnsort") {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DateTime.localeCompare(b.DateTime)
        );
      } else if (currentCreated === "createdAsc") {
        setCurrentCreated("createdDesc");
        dispatch({ type: "createdAsc" });
        sortData = sortData.sort((a, b) =>
          b.DateTime.localeCompare(a.DateTime)
        );
      } else {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DateTime.localeCompare(b.DateTime)
        );
      }
    }
    setAuditLogDatatable(sortData);
  }

  return (
    <div>
      <div className="audit-1">
        <h1>Audit Log History</h1>

        <CSVLink data={csvData} filename={"AuditLog.csv"}>
          <span className="export-1">
            <img
              src="/images/export.png"
              alt="Download"
              className="export"
            ></img>
            Export
          </span>
        </CSVLink>
      </div>

      <table id="table-audit">
        <thead>
          <tr>
            <th id="datetime" onClick={(e) => dispatchSort(e)}>
              Date & Time
              {state.isCreatedSorted ? (
                state.isCreatedDesc ? (
                  <img
                    src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"}
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"}
                  />
                )
              ) : (
                <img src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"} />
              )}
            </th>
            <th id="user" onClick={(e) => dispatchSort(e)}>
              User
              {state.isCreatedSorted ? (
                state.isCreatedDesc ? (
                  <img
                    src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"}
                  />
                ) : (
                  <img
                    src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"}
                  />
                )
              ) : (
                <img src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"} />
              )}
            </th>
            <th>Category</th>
            <th>Changes</th>
            <th>Changed Object</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {AuditLogDatatable.map((auditlog, i) => (
            <tr key={i}>
              <td> {auditlog.DateTime} </td>
              <td> {auditlog.User} </td>
              <td> {auditlog.Category} </td>
              <td> {auditlog.Changes} </td>
              <td> {auditlog.ChangedObject} </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        className="page-a1"
        count={count}
        size="large"
        color="primary"
        page={page}
        shape="rounded"
        onChange={handleChange}
      />
    </div>
  );
}
