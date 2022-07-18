import React from "react";
import "./style.css";
import "reactjs-popup/dist/index.css";
import Popup from "reactjs-popup";
import PropTypes from "prop-types";
import Rating from "@mui/material/Rating";
//import Swal from 'sweetalert2';

// import rate_1 from "./rate_1.png";
// import rate_2 from "./rate_2.png";
// import rate_3 from "./rate_3.png";
// import rate_4 from "./rate_4.png";
// import rate_5 from "./rate_5.png";

function FeedbackRN() {
  const customIcons = {
    1: {
      icon: <img src={process.env.PUBLIC_URL + "/images/rate_3.png"} alt="3" />,
      label: "Very Dissatisfied",
    },
    2: {
      icon: <img src={process.env.PUBLIC_URL + "/images/rate_4.png"} alt="4" />,
      label: "Dissatisfied",
    },
    3: {
      icon: <img src={process.env.PUBLIC_URL + "/images/rate_5.png"} alt="5" />,
      label: "Neutral",
    },
    4: {
      icon: <img src={process.env.PUBLIC_URL + "/images/rate_1.png"} alt="1" />,
      label: "Satisfied",
    },
    5: {
      icon: <img src={process.env.PUBLIC_URL + "/images/rate_2.png"} alt="2" />,
      label: "Very Satisfied",
    },
  };

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  IconContainer.propTypes = {
    value: PropTypes.number.isRequired,
  };

  function RadioGroupRating() {
    return (
      <Rating
        name="highlight-selected-only"
        defaultValue={2}
        IconContainerComponent={IconContainer}
        // highlightSelectedOnly={true}
        // onChangeActive={true}
      />
    );
  }
  return (
    <div className="feedback-center" data-testid="divTest">
      <h2>
        If you find this documentation helpful, please give us a feedback.{" "}
      </h2>
      <br />

      <h3>Rating:</h3>
      <RadioGroupRating />
      <h3>Feedback:</h3>

      <input type="text" placeholder="Enter your feedback here" />

      <br />
      <Popup trigger={<button className="button"> Submit</button>} modal>
        {(close) => (
          <div className="modal">
            <div className="content">
              {" "}
              Thank you! Your feedback has been recorded
            </div>
            <div className="actions"></div>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              Done
            </button>
          </div>
        )}
      </Popup>
      <br />
    </div>
  );
}

//      Swal.fire({

//   title: "<h3>Thank you! Your feedback has been recorded</h3>",

//   showCancelButton: true,

//   confirmButtonText: "OK",

//   cancelButtonText: "CANCEL",

//   confirmButtonColor: "#218838"

// }).then((result) => {

//   if (result.isConfirmed) {

//     updateUserRole(roleData);

//   }

// }).then(() => {

//   props.updateActiveState("None");

// })

export default FeedbackRN;
