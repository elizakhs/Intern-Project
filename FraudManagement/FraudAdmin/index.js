import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import "./style.css";
import { Pagination } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import FraudButton from "./FraudBtn/FraudButton";
import AddNewFraud from "./FraudBtn/AddNewFraud/addnew";

export default function FraudConfig() {
  const [fraudManagement, setFraudManagement] = useState([]);
  const checkfilter = fraudManagement;

  //for sorting
  const [currentCreated, setCurrentCreated] = useState("createdUnsort");
  const [dateClicked, setDateClicked] = useState([]);

  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/fraudmanagement/sel")
      .then((res) => {
        if (res.status === 200) setFraudManagement(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //for pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const _DATA = usePagination(checkfilter, PER_PAGE);
  const count = Math.ceil(checkfilter.length / PER_PAGE);

  //handler for MUI oagination
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const initialState = {
    isCreatedSorted: false,
    isCreatedDesc: false,
  };

  const [state, dispatch] = useReducer(sortReducer, initialState);

  function sortReducer(state, action) {
    if (dateClicked === "term" || dateClicked === "id") {
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
    let sortData = [...fraudManagement];
    setDateClicked(e.currentTarget.id);
    let targetDate = e.currentTarget.id;

    if (targetDate === "id") {
      if (currentCreated === "createdUnsort") {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) => a.id - b.id);
      } else if (currentCreated === "createdAsc") {
        setCurrentCreated("createdDesc");
        dispatch({ type: "createdAsc" });
        sortData = sortData.sort((a, b) => b.id - a.id);
      } else {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) => a.id - b.id);
      }
    }

    if (targetDate === "term") {
      if (currentCreated === "createdUnsort") {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) => a.term.localeCompare(b.term));
      } else if (currentCreated === "createdAsc") {
        setCurrentCreated("createdDesc");
        dispatch({ type: "createdAsc" });
        sortData = sortData.sort((a, b) => b.term.localeCompare(a.term));
      } else {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) => a.term.localeCompare(b.term));
      }
    }
    setFraudManagement(sortData);
  }

  function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    // Specify which data will be displayed in the table
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
  return (
    <div className="container-fluid" id="fraud-settings">
      <div className="row">
        <div className="col-lg-12 col-md-6 col-sm-3">
          <div className="row">
            <h1 id="fraud-title" className="text-start">
              Filtered Words
            </h1>
          </div>
          <div className="row ">
            <div className="">
              <button
                className="button-blue"
                onClick={() => setShowAdd(!showAdd)}
              >
                Add New
              </button>
            </div>
          </div>
          <div>{showAdd ? <AddNewFraud /> : null}</div>
          <div className="row">
            <table id="fraud">
              <thead>
                <tr>
                  <th id="id" onClick={(e) => dispatchSort(e)}>
                    ID
                    {state.isCreatedSorted ? (
                      state.isCreatedDesc ? (
                        <img
                          src={
                            process.env.PUBLIC_URL + "/icons/descendblack.svg"
                          }
                          alt="descending"
                        />
                      ) : (
                        <img
                          src={
                            process.env.PUBLIC_URL + "/icons/ascendblack.svg"
                          }
                          alt="ascending"
                        />
                      )
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"}
                        alt="click to sort"
                      />
                    )}
                  </th>
                  <th id="term" onClick={(e) => dispatchSort(e)}>
                    Term
                    {state.isCreatedSorted ? (
                      state.isCreatedDesc ? (
                        <img
                          src={
                            process.env.PUBLIC_URL + "/icons/descendblack.svg"
                          }
                          alt="descending"
                        />
                      ) : (
                        <img
                          src={
                            process.env.PUBLIC_URL + "/icons/ascendblack.svg"
                          }
                          alt="ascending"
                        />
                      )
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + "/icons/unsortblack.svg"}
                        alt="click to sort"
                      />
                    )}
                  </th>
                  <th>Action</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {_DATA.currentData().map((fraudButton, i) => (
                  <FraudButton fraudButton={fraudButton} i={i} />
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <Pagination
              className="pageBar"
              count={count}
              size="large"
              color="primary"
              page={page}
              shape="rounded"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
