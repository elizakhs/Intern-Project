import React, { useState, useReducer, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Pagination } from "@mui/material";
import "./index.css";
import axios from "axios";

export default function Dashboard() {
  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  //for sorting
  const [currentCreated, setCurrentCreated] = useState("createdUnsort");
  const [currentSchedule, setCurrentSchedule] = useState("scheduleUnsort");
  const [dateClicked, setDateClicked] = useState("");

  //for filtering using text input
  const [query, setQuery] = useState("");
  const [targetFilter, setTargetFilter] = useState("");

  //label for checkbox filtering
  const statusLabel = [
    {
      id: 1,
      name: "In Draft",
      value: "In Draft",
    },
    {
      id: 2,
      name: "Sent for approval",
      value: "Sent for approval",
    },
    {
      id: 3,
      name: "Approved",
      value: "Approved",
    },
  ];

  const visibleLabel = [
    {
      id: 4,
      name: "On",
      value: 1,
    },
    {
      id: 5,
      name: "Off",
      value: 0,
    },
  ];
  const fbuttonLabel = [
    {
      id: 6,
      name: "On",
      value: 1,
    },
    {
      id: 7,
      name: "Off",
      value: 0,
    },
  ];

  //to store which checkbox is checked
  const [fbuttonFilter, setFbuttonFilter] = useState([]);
  const [visibleFilter, setVisibleFilter] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);

  //to determine which checkbox has been ticked
  const [checkedStatusState, setCheckedStatusState] = useState([
    false,
    false,
    false,
  ]);
  const [checkedVisibleState, setCheckedVisibleState] = useState([
    false,
    false,
  ]);
  const [checkedFeedbackState, setCheckedFeedbackState] = useState([
    false,
    false,
  ]);

  //using filtering
  const checkfilter = useCheckbox(tableData);

  useEffect(() => {
    axios
      .get("http://localhost:8080/ctdashboard")
      .then((response) => {
        if (response.status === 200) setTableData(response.data[0]);
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
    isScheduleSorted: false,
    isCreatedDesc: false,
    isScheduleDesc: false,
  };

  const [state, dispatch] = useReducer(sortReducer, initialState);

  function sortReducer(state, action) {
    if (dateClicked === "DateCreated") {
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
    } else if (dateClicked === "DatePublished") {
      switch (action.type) {
        case "scheduleUnsort":
          return {
            isScheduleSorted: true,
            isScheduleDesc: false,
          };
        case "scheduleAsc":
          return {
            isScheduleSorted: true,
            isScheduleDesc: true,
          };
        case "scheduleDesc":
          return {
            isScheduleSorted: true,
            isScheduleDesc: false,
          };
        default:
          return {
            isScheduleSorted: state.isScheduleSorted,
            isScheduleDesc: state.isScheduleDesc,
          };
      }
    }
  }

  function dispatchSort(e) {
    let sortData = [...tableData];
    setDateClicked(e.currentTarget.id);
    let targetDate = e.currentTarget.id;

    if (targetDate === "DateCreated") {
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
    } else if (targetDate === "DatePublished") {
      if (currentSchedule === "scheduleUnsort") {
        setCurrentSchedule("scheduleAsc");
        dispatch({ type: "scheduleUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DatePublished.localeCompare(b.DatePublished)
        );
      } else if (currentSchedule === "scheduleAsc") {
        setCurrentSchedule("scheduleDesc");
        dispatch({ type: "scheduleAsc" });
        sortData = sortData.sort((a, b) =>
          b.DatePublished.localeCompare(a.DatePublished)
        );
      } else {
        setCurrentSchedule("scheduleAsc");
        dispatch({ type: "scheduleUnsort" });
        sortData = sortData.sort((a, b) =>
          a.DatePublished.localeCompare(b.DatePublished)
        );
      }
    }

    setTableData(sortData);
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

  //handler for text input filtering
  function handleFilter(e) {
    setTargetFilter(e.target.id);
    setQuery(e.target.value);
  }

  //event handler for checkbox filtering
  function handleCheckbox(filter, column, position) {
    if (column === "fbutton") {
      let feedback = checkedFeedbackState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedFeedbackState(feedback);

      if (fbuttonFilter.includes(filter)) {
        const filterIndex = fbuttonFilter.indexOf(filter);
        const newFilter = [...fbuttonFilter];
        newFilter.splice(filterIndex, 1);
        setFbuttonFilter(newFilter);
      } else {
        setFbuttonFilter([...fbuttonFilter, filter]);
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
    } else if (column === "stats") {
      let status = checkedStatusState.map((item, index) =>
        index === position ? !item : item
      );
      setCheckedStatusState(status);

      if (statusFilter.includes(filter)) {
        const filterIndex = statusFilter.indexOf(filter);
        const newFilter = [...statusFilter];
        newFilter.splice(filterIndex, 1);
        setStatusFilter(newFilter);
      } else {
        setStatusFilter([...statusFilter, filter]);
      }
    }
  }

  //where all the filtering implemented
  function useCheckbox(data) {
    let checkdata = [];

    console.log(fbuttonFilter, visibleFilter, statusFilter);

    if (
      (fbuttonFilter.length === 0 ||
        fbuttonFilter.length === fbuttonLabel.length) &&
      (visibleFilter.length === 0 ||
        visibleFilter.length === visibleLabel.length) &&
      (statusFilter.length === 0 ||
        statusFilter.length === statusLabel.length) &&
      query === ""
    ) {
      checkdata = tableData;
    } else {
      if (!checkedFeedbackState.every((x) => x === false)) {
        //if any of the checkbox checked return true
        checkdata = data.filter((item) =>
          fbuttonFilter.includes(item.IsFeebackAllowed)
        );
      }
      if (!checkedVisibleState.every((x) => x === false)) {
        checkdata = data.filter((item) =>
          visibleFilter.includes(item.IsVisible)
        );
      }
      if (!checkedStatusState.every((x) => x === false)) {
        checkdata = data.filter((item) => statusFilter.includes(item.status));
      }
      if (
        !checkedFeedbackState.every((x) => x === false) &&
        !checkedStatusState.every((x) => x === false)
      ) {
        //if both status and feedback button checked
        checkdata = data.filter(
          (item) =>
            fbuttonFilter.includes(item.IsFeebackAllowed) &&
            statusFilter.includes(item.status)
        );
      }
      if (
        !checkedFeedbackState.every((x) => x === false) &&
        !checkedVisibleState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            fbuttonFilter.includes(item.IsFeebackAllowed) &&
            visibleFilter.includes(item.IsVisible)
        );
      }
      if (
        !checkedVisibleState.every((x) => x === false) &&
        !checkedStatusState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            visibleFilter.includes(item.IsVisible) &&
            statusFilter.includes(item.status)
        );
      }
      if (
        !checkedFeedbackState.every((x) => x === false) &&
        !checkedVisibleState.every((x) => x === false) &&
        !checkedStatusState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            fbuttonFilter.includes(item.IsFeebackAllowed) &&
            visibleFilter.includes(item.IsVisible) &&
            statusFilter.includes(item.status)
        );
      }
      if (targetFilter === "Title" && query !== "") {
        //text input filtering
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1
        );
      }
      if (
        targetFilter === "Title" &&
        query !== "" &&
        !checkedFeedbackState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1 &&
            fbuttonFilter.includes(item.IsFeebackAllowed)
        );
      }
      if (
        targetFilter === "Title" &&
        query !== "" &&
        !checkedVisibleState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1 &&
            visibleFilter.includes(item.IsVisible)
        );
      }
      if (
        targetFilter === "Title" &&
        query !== "" &&
        !checkedStatusState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1 &&
            statusFilter.includes(item.status)
        );
      }
      if (
        targetFilter === "Title" &&
        query !== "" &&
        !checkedFeedbackState.every((x) => x === false) &&
        !checkedStatusState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1 &&
            fbuttonFilter.includes(item.IsFeebackAllowed) &&
            statusFilter.includes(item.status)
        );
      }
      if (
        targetFilter === "Title" &&
        query !== "" &&
        !checkedFeedbackState.every((x) => x === false) &&
        !checkedVisibleState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1 &&
            fbuttonFilter.includes(item.IsFeebackAllowed) &&
            visibleFilter.includes(item.IsVisible)
        );
      }
      if (
        targetFilter === "Title" &&
        query !== "" &&
        !checkedVisibleState.every((x) => x === false) &&
        !checkedStatusState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1 &&
            visibleFilter.includes(item.IsVisible) &&
            statusFilter.includes(item.status)
        );
      }
      if (
        targetFilter === "Title" &&
        query !== "" &&
        !checkedFeedbackState.every((x) => x === false) &&
        !checkedVisibleState.every((x) => x === false) &&
        !checkedStatusState.every((x) => x === false)
      ) {
        checkdata = data.filter(
          (item) =>
            item["Title"]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1 &&
            fbuttonFilter.includes(item.IsFeebackAllowed) &&
            visibleFilter.includes(item.IsVisible) &&
            statusFilter.includes(item.status)
        );
      }
    }

    return checkdata;
  }

  function counter(count) {
    let add = 0;
    if (count === "approval") {
      tableData.map((item) => {
        if (item.status === "Sent for approval") add += 1;
      });
    } else if (count === "draft") {
      tableData.map((item) => {
        if (item.status === "In Draft") add += 1;
      });
    } else {
      return console.log("count is not either draft or approval");
    }
    return add;
  }

  return (
    <div className="container-fluid" id="DashboardCC">
      <div className="d-flex d-sm-flex-column">
        <div className="row g-0 d-flex">
          <div className="col-lg-12">
            <table className="table table-hover table-borderless mb-0">
              <thead>
                <tr className="content-summary">
                  <td colSpan={8}>
                    <div className="d-flex justify-content-between">
                      <div className="align-self-center">
                        <p className="d-inline ms-4">{counter("approval")}</p>
                        <sup className="text-danger me-5">Pending Approval</sup>
                        <p className="d-inline ms-5">{counter("draft")}</p>
                        <sup className="text-warning">In Draft</sup>
                      </div>
                      <button className="btn align-self-center me-3 add-content" onClick={() => history.push("/editor/normal")}>
                        New Release Note
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="border-bottom-5 border-white">
                  <th>
                    <button id="DateCreated" onClick={(e) => dispatchSort(e)}>
                      Date
                      {state.isCreatedSorted ? (
                        state.isCreatedDesc ? (
                          <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="descending"
                          />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + "/icons/ascend.svg"}
                            alt="ascending"
                          />
                        )
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/icons/unsort.svg"}
                          alt="click to sort"
                        />
                      )}
                    </button>
                  </th>
                  <th>
                    <div>
                      <button data-bs-toggle="collapse" data-bs-target="#title-collapse" aria-expanded="false" aria-controls="title-collapse">
                        Title
                        <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="dropdown for title"
                        />
                      </button>
                    </div>
                  </th>
                  <th>
                    <button id="DatePublished" onClick={(e) => dispatchSort(e)}>
                      Schedule
                      {state.isScheduleSorted ? (
                        state.isScheduleDesc ? (
                          <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="descending"
                          />
                        ) : (
                          <img
                            src={process.env.PUBLIC_URL + "/icons/ascend.svg"}
                            alt="ascending"
                          />
                        )
                      ) : (
                        <img
                          src={process.env.PUBLIC_URL + "/icons/unsort.svg"}
                          alt="unsort"
                        />
                      )}
                    </button>
                  </th>
                  <th colSpan={2}>
                    <div className="dropdown">
                      <p
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                      >
                        Feedback Button
                        <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="dropdown for feedback button"
                        />
                      </p>
                      <div className="dropdown-menu float-end">
                        {fbuttonLabel.map((cb, index) => (
                          <label className="form-check mb-2" key={`cb-${index}`}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={cb.id}
                              checked={checkedFeedbackState[index]}
                              onChange={() =>
                                handleCheckbox(cb.value, "fbutton", index)
                              }
                            />
                            <label className="form-check-label" htmlFor={cb.id}>
                              {cb.name}
                            </label>
                            <br />
                          </label>
                        ))}
                      </div>
                    </div>
                  </th>
                  <th>
                    <p className="mt-3">
                      Feedback
                      <img 
                      src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                      alt="dropdown for schedule" 
                      />
                    </p>
                  </th>
                  <th>
                    <div className="dropdown">
                      <p
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                      >
                        Visibility
                        <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="dropdown for visibilty"
                        />
                      </p>
                      <div className="dropdown-menu">
                        {visibleLabel.map((cb, index) => (
                          <label className="form-check mb-2" key={`cb-${index}`}>
                            <input
                              className="form-check-input"
                              id={cb.id}
                              type="checkbox"
                              checked={checkedVisibleState[index]}
                              onChange={() =>
                                handleCheckbox(cb.value, "visible", index)
                              }
                            />
                            <label className="form-check-label" htmlFor={cb.id}>
                              {cb.name}
                            </label>
                            <br />
                          </label>
                        ))}
                      </div>
                    </div>
                  </th>
                  <th>
                    <div className="dropdown">
                      <p
                        data-bs-toggle="dropdown"
                        data-bs-auto-close="outside"
                        aria-expanded="false"
                      >
                        Status
                        <img
                            src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                            alt="dropdown for Status"
                        />
                      </p>
                      <div className="dropdown-menu">
                        {statusLabel.map((cb, index) => (
                          <label htmlFor={cb.id} className="form-check mb-2" key={`cb-${index}`}>
                            <input
                              className="form-check-input"
                              
                              id={cb.id}
                              type="checkbox"
                              checked={checkedStatusState[index]}
                              onChange={() =>
                                handleCheckbox(cb.value, "stats", index)
                              }
                            />
                            <label className="form-check-label" htmlFor={cb.id}>
                              {cb.name}
                            </label>
                            <br />
                          </label>
                        ))}
                      </div>
                    </div>
                  </th>
                </tr>
                <tr className="collapse" id="title-collapse">
                  <td colSpan={8}>
                    <input
                      id="Title"
                      className="form-control mb-2"
                      type="text"
                      value={query}
                      placeholder="Search Title..."
                      onChange={(e) => handleFilter(e)}
                    />
                  </td>
                </tr>
              </thead>
              <tbody>
                {_DATA.currentData().map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.DateCreated}</td>
                      <td>{item.Title}</td>
                      <td>{item.DatePublished}</td>
                      <td colSpan={2}>{item.IsFeebackAllowed}</td>
                      <td>{item.feedback}</td>
                      <td>{item.IsVisible}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={8}>
                    <p className="float-start ms-3 mt-2">Total Number of Release: {tableData.length}</p>
                  </td>
                </tr>
              </tfoot>
            </table>
            <Pagination
              className="mt-1 pageBar"
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
