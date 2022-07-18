import React, { useState, useEffect } from "react";
import "../style.css";
import Button from "../../../../Buttons/Buttons";
import DataTable from "../../FAQTable/DataTable";

export default function EditFAQ({ fq, ...props }) {
  return (
    <div class="container-addnew-admin">
      <h2 className="title-addfaq">Edit FAQ</h2>
      <div>
        <p className="float-left">FAQ01</p>
        <label class="switch">
          <input type="checkbox"></input>
          <span class="slider round"></span>
        </label>
        <p id="visible">Visibility</p>
      </div>
      <br />
      <br />
      <br />
      <div className="display-row">
        <label className="section-label" for="faqsection">
          FAQ Section
        </label>
        <select className="select-section" id="faqsection" name="faqsection">
          <option value="ao">Alpha Oil</option>
          <option value="pd">Petronas Digital</option>
          <option value="pu">Petronas Up</option>
          <option value="se">Setel</option>
        </select>

        <label for="faqorder">FAQ Order</label>
        <select className="select-order" id="faqorder" name="faqorder">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="display-column">
        <label className="float-left" for="question">
          Question
        </label>
        <textarea
          className="textarea-question"
          name="question"
          placeholder="Enter a question."
        >
          What is the contents of release notes?
        </textarea>
        <label className="float-left" for="answer">
          Answer
        </label>
        <textarea
          className="textarea-answer"
          name="answer"
          placeholder="Enter an answer."
        >
          Release notes contains the changes, bugs fixed, and documentation on
          uses.
        </textarea>
      </div>
      <div className="button-float">
        <button className="button-red" onClick={() => props.changeState(false)}>
          Cancel
        </button>
        <button className="button-green">Edit</button>
      </div>
    </div>
  );
}
