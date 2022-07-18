import React, { useState, useEffect, useReducer } from "react";
import axios from "axios";
import "./style.css";
import { Pagination } from "@material-ui/lab";
import Button from "../../Buttons/Buttons";
import FAQNewCC from "../FAQNew";
import FAQEditCC from "../FAQEdit";

export default function FAQListCC() {
  //store data and render in dom
  const [FAQList, setFAQList] = useState([]);

  //slider component
  const [showAddFAQCC, setShowAddFAQCC] = useState(false);
  const [showEditFAQCC, setShowEditFAQCC] = useState(false);

  //checkbox filtering
  const sectionLabel = [
    {
      id: 1,
      name: "AlphaOil",
      value: "AlphaOil",
    },
    {
      id: 2,
      name: "Setel",
      value: "Setel",
    },
  ];

  const visibleLabel = [
    {
      id: 3,
      name: "On",
      value: 1,
    },
    {
      id: 4,
      name: "Off",
      value: 0,
    },
  ];

  //store which checkbox is checked
  const [sectionFilter, setSectionFilter] = useState([]);
  const [visibleFilter, setVisibleFilter] = useState([]);

  //determine which checkbox has been ticked
  const [checkedSectionState, setCheckedSectionState] = useState([
    false,
    false,
  ]);

  const [checkedVisibleState, setCheckedVisibleState] = useState([
    false,
    false,
  ]);

  //using filtering
  const checkfilter = useCheckbox(FAQList);

  //using sorting
  const checksort = FAQList;

  //for sorting
  const [currentCreated, setCurrentCreated] = useState("createdUnsort");
  const [dateClicked, setDateClicked] = useState("");

  const initialState = {
    isCreatedSorted: false,
    isCreatedDesc: false,
  };

  const [state, dispatch] = useReducer(sortReducer, initialState);

  function sortReducer(state, action) {
    if (dateClicked === "faqid") {
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
    let sortData = [...FAQList];
    setDateClicked(e.currentTarget.id);
    let targetDate = e.currentTarget.id;

    if (targetDate === "faqid") {
      if (currentCreated === "createdUnsort") {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DateCreated.localeCompare(b.DateCreated)
        );
      } else if (currentCreated === "createdAsc") {
        setCurrentCreated("createdDesc");
        dispatch({ type: "createdAsc" });
        sortData = sortData.sort((a, b) =>
          b.DateCreated.localeCompare(a.DateCreated)
        );
      } else {
        setCurrentCreated("createdAsc");
        dispatch({ type: "createdUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DateCreated.localeCompare(b.DateCreated)
        );
      }
    }

    setFAQList(sortData);
  }

  //fetch data for faq list
  useEffect(() => {
    axios
      .get("http://localhost:8080/faq/sel")
      .then((res) => {
        if (res.status === 200) setFAQList(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  //for mui pagination
  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(checkfilter.length / PER_PAGE);
  const FAQCCData = usePagination(checkfilter, PER_PAGE);

  //handler for pagination
  const handleChange = (event, page) => {
    setPage(page);
    FAQCCData.jump(page);
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

  //event handler for checkbox filtering
  function handleCheckbox(filter, column, position) {
    if (column === "section") {
      let section = checkedSectionState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedSectionState(section);

      if (sectionFilter.includes(filter)) {
        const filterIndex = sectionFilter.indexOf(filter);
        const newFilter = [...sectionFilter];
        newFilter.splice(filterIndex, 1);
        setSectionFilter(newFilter);
      } else {
        setSectionFilter([...sectionFilter, filter]);
      }
    } else if (column === "visible") {
      let visible = checkedVisibleState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedVisibleState(visible);

      if (visibleFilter.includes(filter)) {
        const filterIndex = visibleFilter.indexOf(filter);
        const newFilter = [...visibleFilter];
        newFilter.splice(filterIndex, 1);
        setVisibleFilter(newFilter);
      } else {
        setVisibleFilter([...visibleFilter, filter]);
      }
    }
  }

  //all the filtering implemented
  function useCheckbox(data) {
    let checkdata = [];

    console.log(sectionFilter, visibleFilter);

    if (
      (sectionFilter.length === 0 ||
        sectionFilter.length === sectionLabel.length) &&
      (visibleFilter.length === 0 ||
        visibleFilter.length === visibleLabel.length)
    ) {
      checkdata = FAQList;
    } else {
      //if any of the checkbox checked return true
      if (!checkedSectionState.every((x) => x === false)) {
        checkdata = data.filter((item) => sectionFilter.includes(item.Name));
      }
      if (!checkedVisibleState.every((x) => x === false)) {
        checkdata = data.filter((item) =>
          visibleFilter.includes(item.IsVisible)
        );
      }

      //if both checkbox checked
      if (
        !checkedSectionState.every((x) => x === false) &&
        !checkedVisibleState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            sectionFilter.includes(item.Name) &&
            visibleFilter.includes(item.IsVisible)
        );
      }
    }
    console.log(checkdata);
    return checkdata;
  }

  return (
    <>
      <div className="container-fluid" id="FAQListCC">
        <div className="row g-0 d-flex">
          <div className="d-line flex d-sm-flex-column">
            <div className="col-lg-12">
              <table className="table table-borderless">
                <thead>
                  <tr className="tdashboard">
                    <td colSpan={8}>
                      <div className="title">Frequently Asked Questions</div>
                      <div className="desc">
                        <button
                          className="button-blue"
                          onClick={() => setShowAddFAQCC(!showAddFAQCC)}
                        >
                          Add New
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th id="faqid" onClick={(e) => dispatchSort(e)}>
                      FAQ ID
                      {state.isCreatedSorted ? (
                        state.isCreatedDesc ? (
                          <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                          />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + "/icons/ascend.svg"}
                          />
                        )
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/icons/unsort.svg"}
                        />
                      )}
                    </th>
                    <th>
                      <div class="dropdown">
                        <p
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                          aria-expanded="false"
                        >
                          FAQ Section
                          <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="descending"
                          />
                        </p>
                        <div className="dropdown-menu">
                          {sectionLabel.map((cb, index) => (
                            <label for={cb.id} className="form-check mb-2">
                              <input
                                className="form-check-input"
                                key={`cb-${index}`}
                                id={cb.id}
                                type="checkbox"
                                checked={checkedSectionState[index]}
                                onClick={() =>
                                  handleCheckbox(cb.value, "section", index)
                                }
                              />
                              <label className="form-check-label" for={cb.id}>
                                {cb.name}
                              </label>
                              <br />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Order</th>
                    <th>
                      <div class="dropdown">
                        <p
                          data-bs-toggle="dropdown"
                          data-bs-auto-close="outside"
                          aria-expanded="false"
                        >
                          Visibility
                          <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="descending"
                          />
                        </p>
                        <div className="dropdown-menu">
                          {visibleLabel.map((cb, index) => (
                            <label className="form-check mb-2">
                              <input
                                className="form-check-input"
                                key={`cb-${index}`}
                                id={cb.id}
                                type="checkbox"
                                checked={checkedVisibleState[index]}
                                onClick={() =>
                                  handleCheckbox(cb.value, "visible", index)
                                }
                              />
                              <label className="form-check-label" for={cb.id}>
                                {cb.name}
                              </label>
                              <br />
                            </label>
                          ))}
                        </div>
                      </div>
                    </th>
                    <th>Action</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {FAQCCData.currentData().map((fql, i) => (
                    <tr key={i}>
                      <td>{fql.ID}</td>
                      <td>{fql.Name}</td>
                      <td>{fql.Question}</td>
                      <td>{fql.Answer}</td>
                      <td>{fql.QuestionOrder}</td>
                      <td>{`${fql.IsVisible ? "Yes" : "No"}`}</td>
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
                        {showEditFAQCC && (
                          <FAQEditCC
                            fql={fql}
                            changeState={(showEditFAQCC) =>
                              setShowEditFAQCC(showEditFAQCC)
                            }
                          />
                        )}
                        {showAddFAQCC && (
                          <FAQNewCC
                            fql={fql}
                            changeState={(showAddFAQCC) =>
                              setShowAddFAQCC(showAddFAQCC)
                            }
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={8}>
                      <p className="foot"></p>
                    </td>
                  </tr>
                </tfoot>
              </table>
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
    </>
  );
}
