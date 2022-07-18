import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function FeedbackListCCRN() {
  const [FeedbackCCRNList, setFeedbackCCRNList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/feedbackccrn/sel")
      .then((res) => {
        if (res.status === 200) setFeedbackCCRNList(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  function setSortType(e) {
    let sortData = [...FeedbackCCRNList];
    let sortDate = e.currentTarget.value;
    if (sortDate === "Oldest") {
      sortData = sortData.sort((a, b) =>
        a.DateCreated.localeCompare(b.DateCreated)
      );
    } else if (sortDate === "Newest") {
      sortData = sortData.sort((a, b) =>
        b.DateCreated.localeCompare(a.DateCreated)
      );
    }
    setFeedbackCCRNList(sortData);
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
          console.log("out of bound, no icon will be shown")
        )
        
    }
  }

  return (
    <div class="container">
      <h2>
        <b>Feedback</b>
      </h2>
      <div class="dropdown">
        <form name="DropdownFeedbackCCRN">
          <select
            name="DropdownList"
            id="selectDropdown"
            onChange={(e) => setSortType(e)}
          >
            <option value="Newest" name="newest" selected>
              Newest
            </option>
            <option value="Oldest" name="oldest">
              Oldest
            </option>
          </select>
        </form>
      </div>

      {FeedbackCCRNList.map((fb, i) => (
        <div class="feedbackList">
          <>
            <table>
              <tbody>
                <tr key={i}>
                  <th>{ratingSelector(fb.Rating)}</th>
                  <div class="HeaderName">
                    <th>{fb.UserName}</th>
                  </div>
                </tr>

                <tr>
                  <td colSpan="2">{fb.Feedback}</td>
                </tr>
              </tbody>
            </table>
            <div class="read">
              <table>
                <tbody>
                  <tr>
                    <td class="readdata">
                      <button>{fb.Read}</button>
                    </td>
                    <td>
                      <p>{fb.DateCreated}</p>
                    </td>
                    <td>
                      <img
                        src={process.env.PUBLIC_URL + "/images/read_icon.png"}
                        alt="read data"
                      ></img>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        </div>
      ))}
    </div>
  );
}
export default FeedbackListCCRN;
