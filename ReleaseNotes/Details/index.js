import axios from "axios";
import { useState } from "react";
import GetCurrentLocalDateTime from "../../../services/GetCurrentLocalDateTime";
import "./index.css";

function Detail({titles, bodys}) {
  const datesCreated = GetCurrentLocalDateTime();
  const [datesPublished, setDatePublished] = useState(GetCurrentLocalDateTime());
  const [isfeebacksallowed, setIsFeedbackAllowed] = useState(false)
  const [isVisibles, setIsVisible] = useState(false)
  const [contentType, setContentType] = useState(0);
  const usersid = parseInt(localStorage.getItem("userid")) ;
  const appsid = parseInt(localStorage.getItem("appid"));
  

  const handleSend = (Status) => {
    let content = {
      appid:appsid,
      userid:usersid,
      contenttypeid:contentType,
      statusid:Status,
      isfeebackallowed:isfeebacksallowed,
      isvisible:isVisibles,
      title:titles,
      body:bodys,
      datecreated:datesCreated,
      datemodified:datesCreated,
      datepublished:datesPublished
    };
    axios.post("http://localhost:8080/content/ins",{content}).then((res) =>{
        if(res.status === 200) {
          alert("success!")
        }
      })
      .catch((err) => console.log(err))
  }

  const handleDelete = () => {
    
  }

  return (
    <div className="superContain">
      <div className="container-details">
        <h2>Details</h2>

        <button className="darkgreen-detail" onclick="preview()">
          Preview
        </button>

        <div className="form-check form-switch d-flex detail-input">
          <input 
            className="form-check-input align-self-center mt-2" 
            type="checkbox" 
            id="visiblity"
            onChange={(e) => setIsVisible(!isVisibles)}
          />
          <label 
            className="form-check-label ms-3 mt-2"
            htmlFor="visiblity"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="On: End user can view the content&#013;Off: Only Content creator, Content approval and Admin can
            view this content"
          >
            Visible to End-User
            <img
              src={process.env.PUBLIC_URL + "/images/helpIcon.png"}
              className="helpIcon"
            />
          </label>
        </div>
      
        <div className="form-check form-switch d-flex detail-input">
          <input 
            className="form-check-input align-self-center mt-2" 
            type="checkbox" 
            id="fbutton"
            onChange={(e) => setIsFeedbackAllowed(!isfeebacksallowed)}
          />
          <label 
            className="form-check-label align-self-center ms-3 mt-3" 
            htmlFor="fbutton"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            data-bs-html="true"
            title="Feedback On: End user can give feedback about the content&#10;Feedback Off:
              End user cannot give feedback about the content"
          >
            Feedback Button
            <img
              src={process.env.PUBLIC_URL + "/images/helpIcon.png"}
              className="helpIcon"
            />
          </label>
        </div>

        <div className="d-flex justify-content-start">
          <div className="form-check d-flex detail-input">
            <input 
              className="form-check-input align-self-center mt-2" 
              type="radio" 
              name="docType" 
              id="note"
              value="1"
              onChange={(e) => {setContentType(parseInt(e.target.value))}} 
            />
            <label 
              className="form-check-label align-self-center ms-3 mt-3" 
              htmlFor="note"
            >
              Release Note
            </label>
          </div>
          <div className="form-check d-flex detail-input">
            <input 
              className="form-check-input align-self-center mt-2" 
              type="radio" 
              name="docType" 
              id="doc" 
              value="2"
              onChange={(e) => {setContentType(e.target.value.toString())}}
            />
            <label 
              className="form-check-label align-self-center ms-3 mt-3" 
              htmlFor="doc"
            >
              Documentation
            </label>
          </div>
        </div>
        
        <div className="detail-input">
          <label htmlFor="schedule">Schedule</label>
          <input 
          type="date" 
          id="schedule"
          onChange={(e) => setDatePublished(e.target.value)}
          />
        </div>
      </div>

      <div className="buttonContainer">
        <button className="blue-detail" onClick={() => handleSend(2)}>
          Send for Approval
        </button>
        <button className="red-detail" onClick={() => handleDelete()}>
          Delete
        </button>
        <button className="green-detail" onClick={() => handleSend(1)}>
          Save as Draft
        </button>
      </div>
    </div>
  );
}

export default Detail;
