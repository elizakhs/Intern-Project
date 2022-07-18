import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FeedbackListEU.css";
import Button from "../../Buttons/Buttons";
import { Pagination, TextField } from "@mui/material";
import SelectRating from "./SelectRating";

export default function FeedbackEUList() {
  const [FeedbackListEU, setFeedbackListEU] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/feedback/sel")
      .then((res) => {
        if (res.status === 200) setFeedbackListEU(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  let [page, setPage] = useState(1);
  const PER_PAGE = 4;

  const count = Math.ceil(FeedbackListEU.length / PER_PAGE);
  const FeedbackDataEU = usePagination(FeedbackListEU, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    FeedbackDataEU.jump(p);
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

  function ratingSelector(selectedRating) {
    switch (selectedRating) {
      case 1:
        return (
          <img
            src={process.env.PUBLIC_URL + "/images/rate_1.png"}
            alt="Very Dissatisfied"
          />
        );
      case 2:
        return (
          <img
            src={process.env.PUBLIC_URL + "/images/rate_2.png"}
            alt="Dissatisfied"
          />
        );
      case 3:
        return (
          <img
            src={process.env.PUBLIC_URL + "/images/rate_3.png"}
            alt="Neutral"
          />
        );
      case 4:
        return (
          <img
            src={process.env.PUBLIC_URL + "/images/rate_4.png"}
            alt="Satisfied"
          />
        );
      case 5:
        return (
          <img
            src={process.env.PUBLIC_URL + "/images/rate_5.png"}
            alt="Very Satisfied"
          />
        );
      default:
        return(
          console.log("out of bound, no icon will be displayed")
        );
    }
  }

  const button = [
    {
      type: "button-green-center",
      text: "Save",
    },
  ];

  return (
    <>
      <div className="container-fluid" id="FeedbackListEU">
        <div className="row g-0 d-flex">
          <div className="d-line flex d-sm-flex-column">
            <div className="col-lg-12">
              <table>
                <thead>
                  <tr className="tdashboard">
                    <td colSpan={5}>
                      <div className="title">Feedback List</div>
                    </td>
                  </tr>
                  <tr>
                    <th>Content</th>
                    <th>Date</th>
                    <th>Rating</th>
                    <th>Feedback</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {FeedbackDataEU.currentData().map((fb, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <a href={fb.title}>{fb.title}</a>
                        </td>
                        <td>{fb.DateCreated}</td>
                        <td>
                          <div className="dropdown">
                            {ratingSelector(fb.Rating)}
                            <SelectRating />
                          </div>
                        </td>

                        <td>
                          <TextField
                            id="outlined-normal"
                            variant="outlined"
                            label=" "
                            multiline
                            maxRows={4}
                            defaultValue={fb.Feedback}
                          >
                            {fb.Feedback}
                          </TextField>
                        </td>
                        <td>
                          <Button button={button[0]}></Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5}>
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
      {/* </div> */}
      {/* </div> */}
    </>
  );
}
