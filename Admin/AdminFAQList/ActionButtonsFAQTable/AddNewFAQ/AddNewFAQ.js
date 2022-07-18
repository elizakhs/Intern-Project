import "../style.css";
import Button from "../../../../Buttons/Buttons";

export default function AddNewFAQ({ fq, ...props }) {
  return (
    <div class="container-addnew-admin">
      <h2 className="title-addfaq">Add New FAQ</h2>
      <div>
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
        <label className="float-left">Question</label>
        <textarea
          className="textarea-question"
          name="question"
          placeholder="Enter a question."
        ></textarea>
        <label className="float-left" for="answer">
          Answer
        </label>
        <textarea
          className="textarea-answer"
          name="answer"
          placeholder="Enter an answer."
        ></textarea>
      </div>
      <div className="button-float">
        <button className="button-red" onClick={() => props.changeState(false)}>
          Cancel
        </button>
        <button className="button-green">Create</button>
      </div>
    </div>
  );
}
