import React from "react";
import "./style.css";

function CounterWidget(props) {
  return (
    <div className="container-fluid" id="counter-widget">
      <div className="row" id="fill">
        <div className="col-lg-9 col-md-3 col-sm-1 align-self-center text-center">
          {props.title}
        </div>
        <div className="col align-self-center text-center"> {props.count}</div>
      </div>
    </div>
  );
}

export default CounterWidget;
