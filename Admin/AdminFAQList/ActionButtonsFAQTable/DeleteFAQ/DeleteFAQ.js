import React from "react";
import "../style.css";
import Button from "../../../../Buttons/Buttons";

export default function DeleteFAQ({ fq, ...props }) {
  return (
    <div class="container-addnew-admin">
      <p className="title-addfaq">Delete FAQ</p>
      <div>
        <p className="float-left">FAQ01</p>
      </div>
      <br />
      <br />
      <br />
      <div className="display-row">
        <label className="section-label" for="faqsection">
          FAQ Section
        </label>
        <textarea className="textarea-section" name="section">
          Alpha Oil
        </textarea>

        <label for="faqorder">FAQ Order</label>
        <textarea className="textarea-order" name="order">
          1
        </textarea>
      </div>
      <label className="float-left" for="question">
        Question
      </label>
      <textarea
        className="textarea-question-del"
        name="question"
        placeholder="Enter a question."
      >
        What is the contents of release notes?
      </textarea>
      <label className="float-left" for="answer">
        Answer
      </label>
      <textarea
        className="textarea-answer-del"
        name="answer"
        placeholder="Enter an answer."
      >
        Release notes contains the changes, bugs fixed, and documentation on
        uses.
      </textarea>
      <br />
      <br />
      <div className="float-center">
        <p>Confirm Delete?</p>
        <button className="button-red" onClick={() => props.changeState(false)}>
          Cancel
        </button>
        <button className="button-blue-small">Delete</button>
      </div>
    </div>
  );
}
