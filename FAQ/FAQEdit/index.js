import React, { useState } from "react";
import "./style.css";

export default function FAQEditCC({ fql, ...props }) {
  return (
    <div class="editfaqcc" id="FAQEditCC">
      <button
        onClick={() => props.changeState(false)}
        type="button"
        class="btn-close float-right"
        aria-label="Close"
      ></button>
      <label class="switch">
        <input type="checkbox"></input>
        <span class="slider round"></span>
      </label>
      <p id="visible">Visibility</p>
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
        <label className="question-label">Question</label>
        <textarea
          className="textarea-question"
          name="question"
          placeholder="Enter a question."
        >
          What is a release notes?
        </textarea>
        <label className="answer-label" for="answer">
          Answer
        </label>
        <textarea
          className="textarea-answer"
          name="answer"
          placeholder="Enter an answer."
        >
          Release notes are documents that are distributed with software
          products
        </textarea>
      </div>
      <div className="button-float float-right">
        <button className="button-green">Save</button>
        <button className="button-red" onClick={() => props.changeState(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}
