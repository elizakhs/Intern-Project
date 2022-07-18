import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import UserHeader from "../../ReleaseNotes/Navigation/UserHeader";
import UserNavigation from "../../ReleaseNotes/Navigation/UserNavigation";
import { Pagination } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function BookmarkListEU() {
  const [bookmarkEUList, setBookmarkListEU] = useState([]);
  //const [tableData, setTableData] = useState([]);
  const checkfilter = bookmarkEUList;
  //for sorting
  const [currentCreated, setCurrentCreated] = useState("createdUnsort");
  const [dateClicked, setDateClicked] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:8080/bookmarks/sel_user", {
        book: {
          userid: 1,
        },
      })
      .then((res) => {
        if (res.status === 200) setBookmarkListEU(res.data[0]);
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
    }
  }

  function dispatchSort(e) {
    let sortData = [...bookmarkEUList];
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
    }
    setBookmarkListEU(sortData);
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
    <>
      <div className="BookmarkList-EU">
        <div className="overall">
          <h1>
            <b>{"Bookmark"}</b>
          </h1>
          <table className="table table-borderless text-center">
            <thead>
              <tr>
                <td colSpan={4}></td>
              </tr>

              <tr style={{}}>
                <th id="DateCreated" onClick={(e) => dispatchSort(e)}>
                  Date
                  {state.isCreatedSorted ? (
                    state.isCreatedDesc ? (
                      <img
                        src={process.env.PUBLIC_URL + "/icons/descend.svg"}
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + "/icons/ascend.svg"} />
                    )
                  ) : (
                    <img src={process.env.PUBLIC_URL + "/icons/unsort.svg"} />
                  )}
                </th>

                <th>Title</th>
                <th>Link (url)</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {_DATA.currentData().map((bm, i) => (
                <tr key={i}>
                  <td>{bm.DateCreated}</td>
                  <td>
                    <TextField
                      id="outlined-basic"
                      defaultValue={bm.BookmarkName}
                      variant="outlined"
                    />
                  </td>
                  <td>
                    <a href={bm.URL}>{bm.URL}</a>
                  </td>
                  <td>
                    <button1 type="button" class="btn btn-info">
                      Save
                    </button1>{" "}
                    <button2 type="button" class="btn btn-danger">
                      Delete
                    </button2>
                  </td>
                </tr>
              ))}
            </tbody>
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
    </>
  );
}
